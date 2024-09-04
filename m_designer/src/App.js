import React, { useState } from 'react';
import Canvas from './components/Canvas';
import ToolPanel from './components/ToolPanel';
import PropertiesSidebar from './components/sidebar_components/Properties_sidebar';
import styles from './App.module.css';
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
  };

  return (
    <div className={styles.App}>
      <div className={styles.toolPanelContainer}>
        <ToolPanel selectedTool={selectedTool} setSelectedTool={setSelectedTool} />
      </div>
      <div className={styles.canvasContainer}>
        <Canvas
          selectedTool={selectedTool}
          setSelectedElement={setSelectedElement}
          mapData={mapData} // Pass the LIF JSON data to the Canvas component
          setMapData={setMapData} // Pass the state setter to the Canvas component
          updateElement={updateElement}
        />
      </div>
      <div className={styles.sidebar}>
        <PropertiesSidebar
          selectedElement={selectedElement}
          updateElement={updateElement}
          mapData={mapData}
        />
      </div>
    </div>
  );
};

export default App;