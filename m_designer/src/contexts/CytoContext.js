import React, { createContext, useContext, useRef, useState, useEffect } from 'react';
import cytoscape from 'cytoscape';
import { cytoscapeStyles, gridOptions, cxtMenuOptions } from './cyto-config';
import { useDispatch } from 'react-redux';
import { updateElement, addNode, addEdge } from '../redux/reducers/lifReducer';
import { useTool } from './ToolContext';

const CyContext = createContext();

var gridGuide = require('cytoscape-grid-guide');
var cxtmenu = require('cytoscape-cxtmenu');

gridGuide(cytoscape);
cxtmenu(cytoscape);

export const CyProvider = ({ children, layoutData, updateElement }) => {
  const cyRef = useRef(null);
  const [cyInstance, setCyInstance] = useState(null);
  const dispatch = useDispatch();

  const { selectedTool } = useTool();

  useEffect(() => {
    if (!cyInstance && cyRef.current) {
      console.log('Initializing Cytoscape');
      const cy = cytoscape({
        container: cyRef.current,
        elements: layoutData,
        style: cytoscapeStyles,
        layout: { name: 'preset' }
      });
      setCyInstance(cy);
    }
  }, [cyInstance, layoutData, updateElement]);

  useEffect(() => {
    if (cyInstance) {
      console.log('Updating Cytoscape elements: ', layoutData);
      cyInstance.elements().remove();
      cyInstance.json({ elements: layoutData });
      console.log(cyInstance);
      cyInstance.style(cytoscapeStyles); 

      // Add event listeners for user interactions
      cyInstance.on('tap', 'node', handleNodeTap);
      cyInstance.on('tap', 'edge', handleEdgeTap);
      cyInstance.on('tap', handleCanvasLeftClick);
      
      cyInstance.gridGuide(gridOptions);
      cyInstance.cxtmenu(cxtMenuOptions(updateElement));
    }
  }, [cyInstance, layoutData, updateElement]);

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
    console.log('Right-click on canvas');
    if (event.target === cyInstance) {
      // Handle right-click on canvas to create a new node
      const newNodeData = {
        group: 'nodes',
        data: {
          id: `node-${Date.now()}`,
          label: 'New Node',
          position: { ...event.position }
        },
        position: { ...event.position }
      };
      dispatch(addNode(newNodeData.data));
      // cyInstance.add(newNodeData);
    }
  };

  return (
    <CyContext.Provider value={{ cyInstance, cyRef }}>
      {children}
    </CyContext.Provider>
  );
};

export const useCy = () => useContext(CyContext);
