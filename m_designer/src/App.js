import React, { useState } from 'react';
import Canvas from './components/Canvas';
import ToolPanel from './components/ToolPanel';
import PropertiesSidebar from './components/sidebar_components/Properties_sidebar';
import { Box } from '@mui/material';
import { styled } from '@mui/system';
import initialMapData from './interfaces/map.json';

const AppContainer = styled(Box)({
  display: 'flex',
  height: '100vh',
});

const ToolPanelContainer = styled(Box)({
  width: '60px',
  backgroundColor: '#f4f4f4',
  borderRight: '1px solid #ccc',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingTop: '20px',
});

const CanvasContainer = styled(Box)({
  flex: 1,
  position: 'relative',
});

const SidebarContainer = styled(Box)({
  width: '250px',
  backgroundColor: '#f4f4f4',
  borderLeft: '1px solid #ccc',
  padding: '10px',
});

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
    <AppContainer>
      <ToolPanelContainer>
        <ToolPanel selectedTool={selectedTool} setSelectedTool={setSelectedTool} />
      </ToolPanelContainer>
      <CanvasContainer>
        <Canvas
          selectedTool={selectedTool}
          setSelectedElement={setSelectedElement}
          mapData={mapData}
          setMapData={setMapData}
          updateElement={updateElement}
        />
      </CanvasContainer>
      <SidebarContainer>
        <PropertiesSidebar
          selectedElement={selectedElement}
          updateElement={updateElement}
          mapData={mapData}
        />
      </SidebarContainer>
    </AppContainer>
  );
};

export default App;