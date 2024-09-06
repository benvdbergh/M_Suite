import React, { createContext, useContext, useRef, useState, useEffect } from 'react';
import cytoscape from 'cytoscape';
import { useSelector } from 'react-redux';

import { cytoscapeStyles, gridOptions, cxtMenuOptions } from './cyto-config';
import { useDispatch } from 'react-redux';
import { updateElement, addNode, addEdge } from '../redux/reducers/lifReducer';

import { useTool } from './ToolContext';
import { useLayout } from './LayoutContext';


import Graph from '../components/graph_components/Graph';

const CyContext = createContext();

var gridGuide = require('cytoscape-grid-guide');
var cxtmenu = require('cytoscape-cxtmenu');

gridGuide(cytoscape);
cxtmenu(cytoscape);

export const CyProvider = ({ children, updateElement }) => {
  const cyRef = useRef(null);
  const [cyInstance, setCyInstance] = useState(null);
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
  }, [cyInstance, selectedLayout, updateElement]);

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
      
      cyInstance.gridGuide(gridOptions);
      cyInstance.cxtmenu(cxtMenuOptions(updateElement));

      return () => {
        cyInstance.removeListener('tap', 'node', handleNodeTap);
        cyInstance.removeListener('tap', 'edge', handleEdgeTap);
        cyInstance.removeListener('tap', handleCanvasLeftClick);
      };
    }

  }, [cyInstance, selectedLayout, updateElement, selectedTool]); // Ensure selectedTool is a dependency

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
    if (event.target === cyInstance && selectedTool === 'draw-node') {
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
      //cyInstance.add(newNodeData);
      //console.log('cyInstance', cyInstance);
    }
  };

  return (
    <CyContext.Provider value={{ cyInstance, cyRef }}>
      {children}
    </CyContext.Provider>
  );
};

export const useCy = () => useContext(CyContext);
