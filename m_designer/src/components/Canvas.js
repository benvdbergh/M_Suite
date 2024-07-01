import React, { useEffect, useRef, useState } from 'react';
import cytoscape from 'cytoscape';
import './Canvas.css';

var gridGuide = require('cytoscape-grid-guide');

// Ensure jQuery is available globally
if (typeof window !== 'undefined' && typeof window.$ === 'undefined') {
  window.$ = window.jQuery = require('jquery');
  
}

gridGuide( cytoscape ); // register extension

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

const gridOptions = {
  snapToGridOnRelease: true, // Snap to grid on release
  snapToGridDuringDrag: true, // Snap to grid during drag
  // General
  gridSpacing: 40, // Distance between the lines of the grid.
  snapToGridCenter: false, // Snaps nodes to center of gridlines. When false, snaps to gridlines themselves. Note that either snapToGridOnRelease or snapToGridDuringDrag must be true.
  drawGrid: true,

  // Draw Grid
  zoomDash: true, // Determines whether the size of the dashes should change when the drawing is zoomed in and out if grid is drawn.
  panGrid: true, // Determines whether the grid should move then the user moves the graph if grid is drawn.
  gridStackOrder: 0, // Namely z-index
  gridColor: '#dedede', // Color of grid lines
  lineWidth: 1.0, // Width of grid lines
}

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
      
      cy.gridGuide(gridOptions)
      setCyInstance(cy)
      
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