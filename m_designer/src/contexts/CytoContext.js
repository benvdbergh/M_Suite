import React, { createContext, useContext, useRef, useState, useEffect } from 'react';
import cytoscape from 'cytoscape';

// import { cytoscapeStyles, gridOptions, cxtMenuOptions } from './cyto-config';
import { cytoscapeStyles, gridOptions } from './cyto-config';
import { useDispatch, useSelector } from 'react-redux';
import { addNode, updateNodePosition, extendPath, extendPathFromNode, closePath } from '../state/reducers/globalReducer';
import { setSelectedElement } from '../state/reducers/userReducer';
import { useTool } from './ToolContext';
import { useTheme } from '@mui/material/styles';

import { Layout } from '../state/models/Layout';
import { Node } from '../state/models/Node';
import { Edge } from '../state/models/Edge';
import ToolTypes from '../constants/ToolTypes'; 

const CyContext = createContext();

var gridGuide = require('cytoscape-grid-guide');
var cxtmenu = require('cytoscape-cxtmenu');

gridGuide(cytoscape);
cxtmenu(cytoscape);

export const CyProvider = ({ children }) => {
  const theme = useTheme();
  const cyRef = useRef(null);
  const [cyInstance, setCyInstance] = useState(null);
  const [drawingPath, setDrawingPath] = useState(false);
  const [lastNode, setLastNode] = useState(null);
  const selectedTool = useTool().selectedTool;
  const setSeletedTool = useTool().setSelectedTool;

  const dispatch = useDispatch();
  const selectedLayoutId = useSelector((state) => state.user.selectedLayoutId);
  const layouts = useSelector((state) => state.global.layouts);
  const nodes = useSelector((state) => state.global.nodes);
  const edges = useSelector((state) => state.global.edges);
  const stations = useSelector((state) => state.global.stations);
  const metaInformation = useSelector((state) => state.global.projectMetaInformation);

  console.log('selectedLayoutId: ', selectedLayoutId);
  console.log('layouts: ', layouts);
  console.log('nodes: ', nodes);
  console.log('edges: ', edges);
  console.log('stations: ', stations);
  console.log('metaInformation: ', metaInformation);

  const initialized = useRef(false);

  useEffect(() => {
    if (cyRef.current) {
      // Apply theme background color to the canvas container
      cyRef.current.style.backgroundColor = theme.palette.background.default;
    }
  }, [theme]);

  useEffect(() => {

    if (!initialized.current && cyRef.current && layouts) {
      console.log("selectedLayoutId", selectedLayoutId)
      const elements = [];
      // const elements = layout ? Layout.toCytoscape(layout) : [];
      if (nodes) {
        Object.values(nodes).forEach(node => {
          elements.push(Node.toCytoscape(node));
        });
      }
      if (edges) {
        Object.values(edges).forEach(edge => {
          elements.push(Edge.edgesToCytoscape(edge));
        });
      }
      
      const cy = cytoscape({
				container: cyRef.current,
				elements: elements,
				style: [
					...cytoscapeStyles,
					{
						selector: "node",
						style: {
							"background-color": theme.palette.primary.main, // Use primary color for nodes
							color: theme.palette.text.primary,
						},
					},
					{
						selector: "edge",
						style: {
							"line-color": theme.palette.divider,
						},
					},
				],
				layout: { name: "preset" },
			});

      console.log('Cy instance:', cy);
      setCyInstance(cy);
      initialized.current = true;
      const projectId = metaInformation.projectIdentification;
			const layoutId = selectedLayoutId;
      dispatch(setSelectedElement({projectId, layoutId, elementType: null, elementId: null}));
    }
  }, [selectedLayoutId, layouts, metaInformation, nodes, edges, stations, theme, dispatch]);

  useEffect(() => {
    if (cyInstance) {
      const projectId = metaInformation.projectIdentification;
      const layoutId = selectedLayoutId;
      const layout = layouts[layoutId];

      const elements = layout ? Layout.toCytoscape(nodes, edges, stations) : [];
      
      if (elements) {
        cyInstance.batch(() => {
          cyInstance.elements().remove();
          cyInstance.add(elements);
          cyInstance.style([
						...cytoscapeStyles,
						{
							selector: "node",
							style: {
								"background-color": theme.palette.primary.main,
								color: theme.palette.text.primary,
							},
						},
						{
							selector: "edge",
							style: {
								"line-color": theme.palette.divider,
							},
						},
					]);
        });
      } else {
        console.warn("No elements to update in cyInstance");
      }

      const handleNodeTap = (event) => {
        event.stopPropagation();
        if (event.target.isNode()) {
          const node = event.target;
          console.log('Node tapped:', node.id());
    
          switch (selectedTool) { 
            case ToolTypes.SELECT:
              if (node.id() in nodes) {
                console.log('Node tapped:', node.id());
                dispatch(setSelectedElement({projectId, layoutId, elementType: "node", elementId: node.id()}));
              }
              break;
            case ToolTypes.DRAW_PATH:
              // First node tapped, stargin a new path from existing node
              if (!drawingPath) {
                if (!lastNode) {
                  setLastNode(node.id());
								  setDrawingPath(true);
                }
              }
              // Last node tapped, close the path to the existing node (last node can be null)
              else {
                console.log('closePath', lastNode, node.id());
                dispatch(closePath({ lastNodeId: lastNode, endNodeId: node.id() }));
                setLastNode(null);
                setDrawingPath(false);
              }
              break;
            default:
              break;
          }
        }
      };
    
      const handleEdgeTap = (event) => {
        const edge = event.target;
        // Handle edge tap event
        console.log('Edge tapped:', edge.id());
        dispatch(setSelectedElement({ projectId, layoutId, elementType: "edge", elementId: edge.id() }));
        setSeletedTool(ToolTypes.SELECT);
      };
    
      const handleCanvasLeftClick = (event) => {
        event.stopPropagation();
        if (event.target === cyInstance) {
          const position = { ...event.position };
          switch (selectedTool) {
            case ToolTypes.SELECT:
              dispatch(setSelectedElement({projectId, layoutId, elementType: null, elementId: null}));
              break;
            case ToolTypes.DRAW_NODE:
              dispatch(addNode({nodes, position}));
              break;
            case ToolTypes.DRAW_PATH:
              if (!drawingPath && !lastNode) {
                dispatch(addNode({ layoutId, position }));
                setDrawingPath(true);
              } else if (drawingPath && !lastNode) {
                dispatch(extendPath({ layoutId, position }));
              } else if (drawingPath && lastNode) {
                dispatch(extendPathFromNode({ position, nodeId: lastNode }));
                setLastNode(null);
              }
              break;
            default:
              break;
          }
        }
      };
    
      const handleCanvasDragFree = (event) => {
        event.stopPropagation();
        if ( event.target.isNode()) {
          const draggedNode = event.target;
          const newPosition = draggedNode.position();
          dispatch(updateNodePosition({ layoutId: selectedLayoutId, nodeId: draggedNode.id(), newPosition: newPosition }));
        }
      };

      cyInstance.gridGuide(gridOptions);
      // cyInstance.cxtmenu(cxtMenuOptions(updateElement));

      // Add event listeners for user interactions
      cyInstance.on('tap', 'node', handleNodeTap);
      cyInstance.on('tap', 'edge', handleEdgeTap);
      cyInstance.on('tap', handleCanvasLeftClick);
      cyInstance.on('drag', 'node', handleCanvasDragFree);

      // Add event listener to reset drawingPath when clicking outside the canvas
      const handleDocumentClick = (event) => {
        if (!cyRef.current.contains(event.target)) {
          setDrawingPath(false); 
        }
      };

      document.addEventListener('click', handleDocumentClick);

      return () => {
        cyInstance.removeListener('tap', 'node', handleNodeTap);
        cyInstance.removeListener('tap', 'edge', handleEdgeTap);
        cyInstance.removeListener('tap', handleCanvasLeftClick);
        cyInstance.removeListener('drag', 'node', handleCanvasDragFree);
        document.removeEventListener('click', handleDocumentClick);
      };
    }

  }, [cyInstance, layouts, selectedLayoutId, selectedTool, drawingPath, setSeletedTool, metaInformation, nodes, edges, stations, theme, lastNode,dispatch]);

  return (
    <CyContext.Provider value={{ cyInstance, cyRef }}>
      {children}
    </CyContext.Provider>
  );
};

export const useCy = () => useContext(CyContext);