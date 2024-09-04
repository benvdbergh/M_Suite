import React, { useState } from 'react';
import Canvas from './components/Canvas';
import ToolPanel from './components/ToolPanel';
import PropertiesSidebar from './components/sidebar_components/Properties_sidebar';
import { Box } from '@mui/material';
import styles from './App.module.css';
import initialMapData from './interfaces/map.json';

const App = () => {
  const [selectedTool, setSelectedTool] = useState('select');
  const [selectedElement, setSelectedElement] = useState(null);
  const [mapData, setMapData] = useState(initialMapData);

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
    <Box className={styles.App}>
      <Box className={styles.toolPanelContainer}>
        <ToolPanel selectedTool={selectedTool} setSelectedTool={setSelectedTool} />
      </Box>
      <Box className={styles.canvasContainer}>
        <Canvas
          selectedTool={selectedTool}
          setSelectedElement={setSelectedElement}
          mapData={mapData}
          setMapData={setMapData}
          updateElement={updateElement}
        />
      </Box>
      <Box className={styles.sidebar}>
        <PropertiesSidebar
          selectedElement={selectedElement}
          updateElement={updateElement}
          mapData={mapData}
        />
      </Box>
    </Box>
  );
};

export default App;