// src/components/Canvas.js
import React, { useEffect, useRef, useState } from 'react';
import cytoscape from 'cytoscape';
import './Canvas.css';

// Define the common style outside of the component function
const cytoscapeStyles = [
  {
    selector: 'node',
    style: {
      'background-color': '#666',
      'label': 'data(label)',
      'width': 20,
      'height': 20,
      'shape': 'ellipse',
    }
  },
  {
    selector: 'edge',
    style: {
      'width': 3,
      'line-color': '#ccc',
      'curve-style': 'bezier',
      'control-point-step-size': 40
    }
  }
];

const Canvas = ({ selectedTool, setSelectedElement, elements, setElements }) => {
  const cyRef = useRef(null);
  const [isDrawingEdge, setIsDrawingEdge] = useState(false);
  const [sourceNode, setSourceNode] = useState(null);
  const [cyInstance, setCyInstance] = useState(null);

  useEffect(() => {
    if (!cyInstance) {
      const cy = cytoscape({
        container: cyRef.current,
        elements: elements,
        style: cytoscapeStyles,
        layout: {
          name: 'preset'
        }
      });
      setCyInstance(cy);
    }

    // This effect only needs to run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (cyInstance) {
      cyInstance.json({ elements: elements });
    }
  }, [elements, cyInstance]);

  useEffect(() => {
    if (!cyInstance) return;

    const handleTapNode = (event) => {
      const node = event.target;
      setSelectedElement(node.data());

      if (selectedTool === 'draw-edge') {
        if (!isDrawingEdge) {
          setSourceNode(node);
          setIsDrawingEdge(true);
          node.style('border-color', 'red');
        } else {
          const targetNode = node;
          if (sourceNode.id() !== targetNode.id()) {
            const edgeId = `e${sourceNode.id()}-${targetNode.id()}`;
            const newEdge = {
              group: 'edges',
              data: { id: edgeId, source: sourceNode.id(), target: targetNode.id() }
            };
            setElements((els) => [...els, newEdge]);
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
        const newNode = {
          group: 'nodes',
          data: { id: `node-${cyInstance.nodes().length + 1}`, label: `Node ${cyInstance.nodes().length + 1}`, group: 'nodes' },
          position
        };
        setElements((els) => [...els, newNode]);
      }
    };

    cyInstance.on('tap', 'node', handleTapNode);
    cyInstance.on('tap', handleTapCanvas);

    return () => {
      cyInstance.removeListener('tap', 'node', handleTapNode);
      cyInstance.removeListener('tap', handleTapCanvas);
    };
  }, [selectedTool, setElements, isDrawingEdge, cyInstance, setSelectedElement, sourceNode]);

  return <div ref={cyRef} className="canvas"></div>;
};

export default Canvas;
