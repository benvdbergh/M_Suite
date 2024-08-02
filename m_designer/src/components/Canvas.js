import React, { useEffect, useRef, useState } from 'react';
import cytoscape from 'cytoscape';
import { convertToCytoscapeElements } from '../utils/LIF-Cytoscape';
import './Canvas.css';
var gridGuide = require('cytoscape-grid-guide');

// Ensure jQuery is available globally
if (typeof window !== 'undefined' && typeof window.$ === 'undefined') {
  window.$ = window.jQuery = require('jquery');
}

gridGuide(cytoscape); // register extension

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
      'width': 5,
      'line-color': '#ccc',
      'curve-style': 'bezier',
      'control-point-step-size': 40,
      'target-arrow-shape': 'data(targetArrowShape)',
      'source-arrow-shape': 'data(sourceArrowShape)',
      'source-arrow-color': '#ccc',
      'target-arrow-color': '#ccc',
    }
  }
];

const gridOptions = {
  snapToGridOnRelease: true,
  snapToGridDuringDrag: true,
  gridSpacing: 40,
  snapToGridCenter: false,
  drawGrid: true,
  zoomDash: true,
  panGrid: true,
  gridStackOrder: 0,
  gridColor: '#dedede',
  lineWidth: 1.0,
};

const Canvas = ({ selectedTool, setSelectedElement, mapData, setMapData }) => {
  const cyRef = useRef(null);
  const [isDrawingEdge, setIsDrawingEdge] = useState(false);
  const [sourceNode, setSourceNode] = useState(null);
  const [cyInstance, setCyInstance] = useState(null);

  useEffect(() => {
    if (!cyInstance) {
      const cy = cytoscape({
        container: cyRef.current,
        elements: convertToCytoscapeElements(mapData),
        style: cytoscapeStyles,
        layout: {
          name: 'preset'
        }
      });
      setCyInstance(cy);
      cy.gridGuide(gridOptions);
    }
  }, [cyInstance, mapData]);

  useEffect(() => {
    if (cyInstance) {
      cyInstance.json({ elements: convertToCytoscapeElements(mapData) });
      cyInstance.style(cytoscapeStyles);
    }
  }, [mapData, cyInstance]);

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
            
            // Check if an edge already exists in this direction
            const existingEdge = mapData.layouts[0].edges.find(edge => 
              edge.startNodeId === sourceNode.id() && edge.endNodeId === targetNode.id()
            );

            if (!existingEdge) {
              const newEdge = {
                edgeId: edgeId,
                startNodeId: sourceNode.id(),
                endNodeId: targetNode.id(),
                edgeName: `Edge ${sourceNode.id()} to ${targetNode.id()}`,
                edgeDescription: ''
              };
              setMapData(prevMapData => {
                const updatedEdges = [...prevMapData.layouts[0].edges, newEdge];
                return {
                  ...prevMapData,
                  layouts: [
                    {
                      ...prevMapData.layouts[0],
                      edges: updatedEdges,
                    },
                  ],
                };
              });
            } else {
              console.log('Edge already exists in this direction');
              // Optionally, you can show a message to the user here
            }
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
        const newNodeId = `node-${cyInstance.nodes().length + 1}`;
        const newNode = {
          nodeId: newNodeId, 
          nodeName: `Node ${cyInstance.nodes().length + 1}`, 
          nodeDescription: '', 
          nodePosition: { x: position.x, y: position.y },
        };
        setMapData(prevMapData => {
          const updatedNodes = [...prevMapData.layouts[0].nodes, newNode];
          return {
            ...prevMapData,
            layouts: [
              {
                ...prevMapData.layouts[0],
                nodes: updatedNodes,
              },
            ],
          };
        });
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
  }, [selectedTool, setMapData, isDrawingEdge, cyInstance, setSelectedElement, sourceNode, mapData]);

  return <div ref={cyRef} className="canvas"></div>;
};

export default Canvas;