import React, { useEffect, useRef, useState } from 'react';
import cytoscape from 'cytoscape';
import { Graph } from './canvas_components/Graph';
import { cytoscapeStyles, gridOptions, cxtMenuOptions } from '../config/cyto-config';
import CanvasControls from './CanvasControls';
import './Canvas.css';

var gridGuide = require('cytoscape-grid-guide');
var cxtmenu = require('cytoscape-cxtmenu');

// Ensure jQuery is available globally
if (typeof window !== 'undefined' && typeof window.$ === 'undefined') {
  window.$ = window.jQuery = require('jquery');
}

gridGuide(cytoscape); // register extension
cxtmenu(cytoscape); // register extension

const Canvas = ({ selectedTool, setSelectedElement, mapData, setMapData, updateElement }) => {
  const cyRef = useRef(null);
  const [isDrawingEdge, setIsDrawingEdge] = useState(false);
  const [sourceNode, setSourceNode] = useState(null);
  const [cyInstance, setCyInstance] = useState(null);
  const [graph, setGraph] = useState(new Graph(mapData));
  const [selectedElement, setSelectedElementState] = useState(null);

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
      cy.cxtmenu(cxtMenuOptions(updateElement));
    }
    else {
      cyInstance.json({ elements: graph.toCytoscape() });
      cyInstance.style(cytoscapeStyles);
    }
  }, [cyInstance, graph]);

  useEffect(() => {
    if (!cyInstance) return;

    const handleTapNode = (event) => {
      event.stopPropagation(); // Prevent event bubbling
      const node = event.target;
      setSelectedElement(node);
      highlightElement(node);
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

    const handleTapEdge = (event) => {
      event.stopPropagation(); // Prevent event bubbling
      const edge = event.target;
      setSelectedElement(edge);
      highlightElement(edge);
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
        highlightElement(null);
      }
    };

    const handleDragFree = (event) => {
      event.stopPropagation();
      console.log("dragging");
      const node = event.target;
      if (selectedElement !== node) {
        setSelectedElement(node);
        highlightElement(node);
      }
      const position = node.position();
      setSelectedElement(node);
      updateElement(node.id(), { position });

      // Update graph and map data
      setGraph(new Graph(graph.toMapData()));
      setMapData(graph.toMapData());
    };

    const highlightElement = (element) => {
      if (selectedElement) {
        selectedElement.removeClass('selected');
      }
      if (element) {
        element.addClass('selected');
      }
      setSelectedElementState(element);
    };

    cyInstance.on('tap', 'node', handleTapNode);
    cyInstance.on('tap', 'edge', handleTapEdge);
    cyInstance.on('tap', handleTapCanvas);
    cyInstance.on('free', 'node', handleDragFree);

    return () => {
      cyInstance.removeListener('tap', 'node', handleTapNode);
      cyInstance.removeListener('tap', 'edge', handleTapEdge);
      cyInstance.removeListener('tap', handleTapCanvas);
      cyInstance.removeListener('free', 'node', handleDragFree);
    };
  }, [selectedTool, isDrawingEdge, cyInstance, setSelectedElement, sourceNode, graph, setMapData, updateElement, selectedElement]);

  const fitToScreen = () => {
    if (cyInstance) {
      cyInstance.fit();
    }
  };

  const zoomIn = () => {
    if (cyInstance) {
      cyInstance.zoom(cyInstance.zoom() + 0.1);
    }
  };

  const zoomOut = () => {
    if (cyInstance) {
      cyInstance.zoom(cyInstance.zoom() - 0.1);
    }
  };

  return (
    <div className="canvas-container">
      <div ref={cyRef} className="canvas"></div>
      <CanvasControls fitToScreen={fitToScreen} zoomIn={zoomIn} zoomOut={zoomOut} />
    </div>
  );
};

export default Canvas;