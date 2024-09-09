import React, { createContext, useContext, useRef, useState, useEffect } from 'react';
import cytoscape from 'cytoscape';
import { useSelector } from 'react-redux';

import { cytoscapeStyles, gridOptions, cxtMenuOptions } from './cyto-config';
import { useDispatch } from 'react-redux';
import { updateNodePosition, addNode, addEdge } from '../redux/reducers/lifReducer';

import { useTool } from './ToolContext';
import { useLayout } from './LayoutContext';


import Graph from '../components/graph_components/Graph';
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
  const dispatch = useDispatch();

  const { selectedTool } = useTool();
  const { selectedLayout } = useLayout();

  const project = useSelector((state) => state.lif.project);

  useEffect(() => {
    const get_cyto_layout = (layout) => {
      if (layout && layout.nodes && layout.edges) {
        const graph = new Graph(layout);
        return graph.toCytoscape();
      }
      return [];    
    };

    if (!cyInstance && cyRef.current) {
      const cy = cytoscape({
        container: cyRef.current,
        elements: get_cyto_layout(selectedLayout),
        style: cytoscapeStyles,
        layout: { name: 'preset' }
      });
      setCyInstance(cy);
    }
  }, [cyInstance, selectedLayout ]);

  useEffect(() => {
    const get_cyto_layout = (layout) => {
      if (layout && layout.nodes && layout.edges) {
        const graph = new Graph(layout);
        return graph.toCytoscape();
      }
      return [];
    };

    if (cyInstance) {
      cyInstance.elements().remove();
      cyInstance.json({ elements: get_cyto_layout(selectedLayout) });
      cyInstance.style(cytoscapeStyles); 

      // Add event listeners for user interactions
      cyInstance.on('tap', 'node', handleNodeTap);
      cyInstance.on('tap', 'edge', handleEdgeTap);
      cyInstance.on('tap', handleCanvasLeftClick);
      cyInstance.on('free', 'node', handleCanvasDragFree);
      
      cyInstance.gridGuide(gridOptions);
      // cyInstance.cxtmenu(cxtMenuOptions(updateElement));

      return () => {
        cyInstance.removeListener('tap', 'node', handleNodeTap);
        cyInstance.removeListener('tap', 'edge', handleEdgeTap);
        cyInstance.removeListener('tap', handleCanvasLeftClick);
        cyInstance.removeListener('free', 'node', handleCanvasDragFree);
      };
    }

  }, [cyInstance, selectedLayout, selectedTool]);

  const handleNodeTap = (event) => {
    const node = event.target;
    // Handle node tap event
    console.log('Node tapped:', node.id());
  };

  const handleEdgeTap = (event) => {
    const edge = event.target;
    // Handle edge tap event
    console.log('Edge tapped:', edge.id());
  };

  const handleCanvasLeftClick = (event) => {
    event.stopPropagation();
    if (event.target === cyInstance && (selectedTool === ToolTypes.DRAW_NODE || selectedTool === ToolTypes.DRAW_PATH)) {
      console.log('Creating new node for: ', project );
      const newNodeData = {
        group: 'nodes',
        data: {
          id: `node-${selectedLayout.nodes.length + 1}`,
          label: `Node ${selectedLayout.nodes.length + 1}`,
          description: '',
          position: { ...event.position }
        },
        position: { ...event.position }
      };
      dispatch(addNode(newNodeData.data));

      if (selectedTool === ToolTypes.DRAW_PATH) {
        console.log('lastNode: ', lastNode);
        if (lastNode) {
          console.log('newNodeData:', newNodeData);
          if (lastNode.data && newNodeData.data) {
            const newEdgeData = {
              group: 'edges',
              data: {
                id: `edge-${selectedLayout.edges.length + 1}`,
                source: lastNode.data.id,
                target: newNodeData.data.id,
                label: `Edge ${selectedLayout.edges.length + 1}`,
                description: '',
              },
            };
          dispatch(addEdge(newEdgeData.data));
          };
        }
        setLastNode(newNodeData);
      }
    }
  };

  const handleCanvasDragFree = (event) => {
    event.stopPropagation();
    console.log('handleCanvasDragFree called with event:', event);
    if ( event.target.isNode()) {
      const draggedNode = event.target;
      console.log('Dragged node:', draggedNode.id());
      const newPosition = draggedNode.position();
      dispatch(updateNodePosition({ id: draggedNode.id(), newPosition: newPosition }));
    }
  };

  return (
    <CyContext.Provider value={{ cyInstance, cyRef }}>
      {children}
    </CyContext.Provider>
  );
};

export const useCy = () => useContext(CyContext);
