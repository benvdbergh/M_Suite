import React from 'react';
import { useCy } from '../contexts/CytoContext';
import { useTool } from '../contexts/ToolContext';
import CanvasControls from './CanvasControls';
import { Box } from '@mui/material';
import { styled } from '@mui/system';

const CanvasContainer = styled(Box)({
  position: 'relative',
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
});

const CanvasBackground = styled(Box)({
  width: '100%',
  height: '100%',
  backgroundColor: '#fff',
  flex: 1,
});

const Canvas = () => {
  const { cyRef } = useCy();

  return (
    <CanvasContainer>
      <CanvasBackground ref={cyRef}></CanvasBackground>
      <CanvasControls />
    </CanvasContainer>
  );
};

export default Canvas;