import React from 'react';

import { Box } from '@mui/material';
import { styled } from '@mui/system';

import Canvas from './components/canvas_components/Canvas';
import ToolPanel from './components/canvas_components/ToolPanel';
import PropertiesSidebar from './components/sidebar_components/Properties_sidebar';
import AppBarComponent from './components/appbar_components/AppBar';

import { CyProvider } from './contexts/CytoContext';
import { ToolProvider } from './contexts/ToolContext';

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
  display: 'flex',
  flexDirection: 'column',
}));

const SidebarContainer = styled(Box)(({ theme }) => ({
  width: '250px',
  backgroundColor: theme.palette.background.default,
  borderLeft: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(1),
}));

const App = () => {
  return (
      <AppContainer>
        <AppBarComponent />
        <MainContent>
          <ToolProvider>
            <CyProvider>
              <ToolPanelContainer>
                <ToolPanel />
              </ToolPanelContainer>
              <CanvasContainer>
                <Canvas />
              </CanvasContainer>
              <SidebarContainer>
                <PropertiesSidebar />
              </SidebarContainer>
            </CyProvider>
          </ToolProvider>
        </MainContent>
      </AppContainer>
  );
};

export default App;