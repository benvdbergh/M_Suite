import React, { useEffect, useRef, useState } from 'react';
import cytoscape from 'cytoscape';
import { Graph } from './canvas_components/Graph';
import { cytoscapeStyles, gridOptions } from '../utils/cyto-config';

import './Canvas.css';
var gridGuide = require('cytoscape-grid-guide');

// Ensure jQuery is available globally
if (typeof window !== 'undefined' && typeof window.$ === 'undefined') {
  window.$ = window.jQuery = require('jquery');
}

gridGuide(cytoscape); // register extension

const Canvas = ({ selectedTool, setSelectedElement, mapData, setMapData }) => {
  const cyRef = useRef(null);
  const [isDrawingEdge, setIsDrawingEdge] = useState(false);
  const [sourceNode, setSourceNode] = useState(null);
  const [cyInstance, setCyInstance] = useState(null);
  const [graph, setGraph] = useState(new Graph(mapData));

  useEffect(() => {
    if (!cyInstance) {
      const cy = cytoscape({
        container: cyRef.current,
        elements: graph.toCytoscape(),
        style: cytoscapeStyles,
        layout: { name: 'preset' }
      });
      setCyInstance(cy);
      cy.gridGuide(gridOptions);
    }
  }, [cyInstance, graph]);

  useEffect(() => {
    if (cyInstance) {
      cyInstance.json({ elements: graph.toCytoscape() });
      cyInstance.style(cytoscapeStyles);
    }
  }, [graph, cyInstance]);

  useEffect(() => {
    if (!cyInstance) return;

    const handleTapNode = (event) => {
      const node = event.target;
      setSelectedElement(node);
      // console.log(node);
      if (selectedTool === 'draw-edge') {
        if (!isDrawingEdge) {
          setSourceNode(node);
          setIsDrawingEdge(true);
          node.style('border-color', 'red');
        } else {
          const targetNode = node;
          if (sourceNode.id() !== targetNode.id()) {
            const newEdge = graph.addEdge({
              edgeId: `e${sourceNode.id()}-${targetNode.id()}`,
              startNodeId: sourceNode.id(),
              endNodeId: targetNode.id(),
              edgeName: `Edge ${sourceNode.id()} to ${targetNode.id()}`,
              edgeDescription: ''
            });
            setGraph(new Graph(graph.toMapData()));
            setMapData(graph.toMapData());
          }
          setIsDrawingEdge(false);
          setSourceNode(null);
          sourceNode.style('border-color', '');
        }
      }
    };

    const handleTapCanvas = (event) => {
      if (selectedTool === 'draw-node' && event.target === cyInstance) {
        const position = event.position;
        const newNode = graph.addNode({
          nodeId: `node-${graph.nodes.length + 1}`,
          nodeName: `Node ${graph.nodes.length + 1}`,
          nodeDescription: '',
          nodePosition: position,
        });
        setGraph(new Graph(graph.toMapData()));
        setMapData(graph.toMapData());
      }

      if (selectedTool === 'select' && event.target === cyInstance) {
        setSelectedElement(null);
      }
    };

    cyInstance.on('tap', 'node', handleTapNode);
    cyInstance.on('tap', handleTapCanvas);

    return () => {
      cyInstance.removeListener('tap', 'node', handleTapNode);
      cyInstance.removeListener('tap', handleTapCanvas);
    };
  }, [selectedTool, isDrawingEdge, cyInstance, setSelectedElement, sourceNode, graph, setMapData]);

  return <div ref={cyRef} className="canvas"></div>;
};

export default Canvas;