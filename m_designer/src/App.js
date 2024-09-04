import React, { useState } from 'react';
import Canvas from './components/Canvas';
import ToolPanel from './components/ToolPanel';
import PropertiesSidebar from './components/sidebar_components/Properties_sidebar';
import AppBarComponent from './components/AppBar';
import { Box } from '@mui/material';
import { styled } from '@mui/system';
import initialMapData from './interfaces/map.json';

const AppContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
}));

const MainContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  flex: 1,
}));

const ToolPanelContainer = styled(Box)(({ theme }) => ({
  width: '60px',
  backgroundColor: theme.palette.background.default,
  borderRight: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingTop: theme.spacing(2),
}));

const CanvasContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  position: 'relative',
}));

const SidebarContainer = styled(Box)(({ theme }) => ({
  width: '250px',
  backgroundColor: theme.palette.background.default,
  borderLeft: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(1),
}));

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
      <AppBarComponent />
      <MainContent>
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
      </MainContent>
    </AppContainer>
  );
};

export default App;