import React from 'react';
import { useCy } from '../../contexts/CytoContext';
import ZoomControls from './ZoomControls';
import VechicleTypeDropdown from './VehicleTypeDropdown';
import { Box } from '@mui/material';
import { styled } from '@mui/system';

const CanvasContainer = styled(Box)({
  position: 'relative',
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
});

const CytoCanvas = styled(Box)({
  width: '100%',
  height: '100%',
  backgroundColor: '#fff',
  flex: 1,
});

const Canvas = () => {
  const { cyRef } = useCy();

  return (
    <CanvasContainer>
      <CytoCanvas ref={cyRef}></CytoCanvas>
      <ZoomControls />
      <VechicleTypeDropdown />
    </CanvasContainer>
  );
};

export default Canvas;