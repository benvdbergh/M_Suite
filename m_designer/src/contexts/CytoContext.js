import React, { createContext, useContext, useRef, useState, useEffect } from 'react';
import cytoscape from 'cytoscape';

// import { cytoscapeStyles, gridOptions, cxtMenuOptions } from './cyto-config';
import { cytoscapeStyles, gridOptions } from './cyto-config';
import { useDispatch, useSelector } from 'react-redux';
import { addNode, addEdge, updateNodePosition } from '../state/reducers/globalReducer';
import { useTool } from './ToolContext';

import { Layout } from '../state/models/Layout';
import ToolTypes from '../constants/ToolTypes'; 

const CyContext = createContext();

var gridGuide = require('cytoscape-grid-guide');
var cxtmenu = require('cytoscape-cxtmenu');

gridGuide(cytoscape);
cxtmenu(cytoscape);

export const CyProvider = ({ children }) => {
  const cyRef = useRef(null);
  const [cyInstance, setCyInstance] = useState(null);
  const [lastNode, setLastNode] = useState(null);
  const selectedTool = useTool().selectedTool;

  const dispatch = useDispatch();
  const project = useSelector((state) => state.global.project);
  const selectedLayoutId = useSelector((state) => state.user.selectedLayoutId);

  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current && cyRef.current) {
      const layout = selectedLayoutId ? project.layouts.find(l => l.layoutId === selectedLayoutId) : null;  
      console.log('Init Layout:', layout);
      const elements = layout ? Layout.toCytoscape(layout) : [];

      const cy = cytoscape({
        container: cyRef.current,
        elements: elements,
        style: cytoscapeStyles,
        layout: { name: 'preset' }
      });

      console.log('Cy instance:', cy);

      setLastNode(null);
      setCyInstance(cy);
      initialized.current = true;
      // return () => {
      //   cy.destroy();
      //   setCyInstance(null);
      // };
    }
  }, [project, selectedLayoutId]);

  useEffect(() => {
    if (cyInstance) {
      const layout = project.layouts.find(l => l.layoutId === selectedLayoutId);
      const elements = layout ? Layout.toCytoscape(layout) : [];
      console.log("update cyInstance with elements:", elements);  
      if (elements) {
        cyInstance.batch(() => {
          cyInstance.elements().remove();
          cyInstance.add(elements);
          cyInstance.style(cytoscapeStyles);
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
              // dispatch(setSelectedElement(node.data()));
              break;
            case ToolTypes.DRAW_PATH:
              if (lastNode) {
                if (lastNode.data && node.data()) {
                  console.log("Closing the path to node: ", node.id());
                  // const newEdgeData = {
                  //   group: 'edges',
                  //   data: {
                  //     id: `edge-${selectedLayoutId.edges.length + 1}`,
                  //     source: lastNode.data.id,
                  //     target: node.id(),
                  //     label: `Edge ${selectedLayoutId.edges.length + 1}`,
                  //     description: '',
                  //   },
                  // };
                  // dispatch(addEdge(newEdgeData.data));
                  setLastNode(null);
                };
              } else {
                setLastNode(node);
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
      };
    
      const handleCanvasLeftClick = (event) => {
        event.stopPropagation();
        if (event.target === cyInstance && (selectedTool === ToolTypes.DRAW_NODE || selectedTool === ToolTypes.DRAW_PATH)) {
          const position = { ...event.position };
          switch (selectedTool) {
            case ToolTypes.SELECT:
              // dispatch(setSelectedElement(node.data()));
              break;
            case ToolTypes.DRAW_NODE:
              dispatch(addNode({selectedLayoutId, position}));
              break;
            case ToolTypes.DRAW_PATH:
              // if (lastNode) {
              //   if (lastNode.data && node.data()) {
              //     dispatch(addNode({selectedLayoutId, position}));
              //     if (selectedTool === ToolTypes.DRAW_PATH) {
              //       if (lastNode && selectedLayout.nodes.some(node => node.id === lastNode.data.id)) {
              //         if (lastNode.data && newNodeData.data) {
              //           const sourceNode = lastNode.data.id;
              //           const targetNode = newNodeData.data.id;
              //           dispatch(addEdge(selectedLayoutId, sourceNode, targetNode ));
              //         };
              //       }
              //       setLastNode(newNodeData);
              //     }
              //   };
              // } else {
              //   setLastNode(node);
              // }
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

      return () => {
        cyInstance.removeListener('tap', 'node', handleNodeTap);
        cyInstance.removeListener('tap', 'edge', handleEdgeTap);
        cyInstance.removeListener('tap', handleCanvasLeftClick);
        cyInstance.removeListener('drag', 'node', handleCanvasDragFree);
      };
    }

  }, [cyInstance, project, selectedLayoutId, selectedTool, lastNode, dispatch]);

  return (
    <CyContext.Provider value={{ cyInstance, cyRef }}>
      {children}
    </CyContext.Provider>
  );
};

export const useCy = () => useContext(CyContext);