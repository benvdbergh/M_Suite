import React, { createContext, useContext, useRef, useState, useEffect } from 'react';
import cytoscape from 'cytoscape';

// import { cytoscapeStyles, gridOptions, cxtMenuOptions } from './cyto-config';
import { cytoscapeStyles, gridOptions } from './cyto-config';
import { useDispatch, useSelector } from 'react-redux';
import { addNode, updateNodePosition, extendPath } from '../state/reducers/globalReducer';
import { setSelectedElement } from '../state/reducers/userReducer';
import { useTool } from './ToolContext';
import { useTheme } from '@mui/material/styles';

import { Layout } from '../state/models/Layout';
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
  const selectedTool = useTool().selectedTool;
  const setSeletedTool = useTool().setSelectedTool;

  const dispatch = useDispatch();
  const project = useSelector((state) => state.global.project);
  const selectedLayoutId = useSelector((state) => state.user.selectedLayoutId);

  const initialized = useRef(false);

  useEffect(() => {
    if (cyRef.current) {
      // Apply theme background color to the canvas container
      cyRef.current.style.backgroundColor = theme.palette.background.default;
    }
  }, [theme]);

  useEffect(() => {

    if (!initialized.current && cyRef.current) {
      const layout = selectedLayoutId ? project.layouts.find(l => l.layoutId === selectedLayoutId) : null;  
      console.log('Init Layout:', layout);
      const elements = layout ? Layout.toCytoscape(layout) : [];

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
    }
  }, [project, selectedLayoutId]);

  useEffect(() => {
    if (cyInstance) {
      const projectId = project.metaInformation.projectIdentification;
      const layoutId = selectedLayoutId;
      const layout = project.layouts.find(l => l.layoutId === selectedLayoutId);
      const elements = layout ? Layout.toCytoscape(layout) : [];
      
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
              dispatch(setSelectedElement({projectId, layoutId, elementType: "node", elementId: node.id()}));
              break;
            case ToolTypes.DRAW_PATH:
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
              dispatch(addNode({layoutId, position}));
              break;
            case ToolTypes.DRAW_PATH:
              if (!drawingPath) {
                dispatch(addNode({ layoutId, position }));
                setDrawingPath(true);
              } else {
                dispatch(extendPath({ layoutId, position }));
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

  }, [cyInstance, project, selectedLayoutId, selectedTool, drawingPath, setSeletedTool, dispatch]);

  return (
    <CyContext.Provider value={{ cyInstance, cyRef }}>
      {children}
    </CyContext.Provider>
  );
};

export const useCy = () => useContext(CyContext);