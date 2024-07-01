import React, { useState } from 'react';
import Canvas from './components/Canvas';
import ToolPanel from './components/ToolPanel';
import PropertiesSidebar from './components/PropertiesSidebar';
import ExportButton from './components/ExportButton';
import './App.css';
import initialMapData from './interfaces/map.json'; // Import the initial JSON map file

const App = () => {
  const [selectedTool, setSelectedTool] = useState('select');
  const [selectedElement, setSelectedElement] = useState(null);
  const [mapData, setMapData] = useState(initialMapData); // Store the LIF JSON data in state

  const updateElement = (id, newData) => {
    setMapData(prevMapData => {
      const updatedNodes = prevMapData.layouts[0].nodes.map(node =>
        node.nodeId === id ? { ...node, ...newData } : node
      );
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
    //setSelectedElement(prevElement => ({ ...prevElement, label: newLabel }));
  };

  return (
    <div className="App">
      <div className="tool-panel-container">
        <ToolPanel selectedTool={selectedTool} setSelectedTool={setSelectedTool} />
      </div>
      <div className="canvas-container">
        <Canvas
          selectedTool={selectedTool}
          setSelectedElement={setSelectedElement}
          mapData={mapData} // Pass the LIF JSON data to the Canvas component
          setMapData={setMapData} // Pass the state setter to the Canvas component
        />
      </div>
      <div className="sidebar">
        <PropertiesSidebar
          selectedElement={selectedElement}
          updateElement={updateElement}
        />
      </div>
      <ExportButton mapData={mapData} />
    </div>
  );
};

export default App;