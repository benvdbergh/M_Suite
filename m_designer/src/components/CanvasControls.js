import React from 'react';
import { IconButton, Box } from '@mui/material';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { styled } from '@mui/system';

const CanvasControlsContainer = styled(Box)({
  position: 'absolute',
  bottom: '10px',
  right: '10px',
  display: 'flex',
  flexDirection: 'column',
});

const CanvasControlsButton = styled(IconButton)(({ active }) => ({
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: '10px',
  fontSize: '20px',
  color: '#666',
  backgroundColor: active ? '#cccccc' : 'transparent',
  '&:hover': {
    backgroundColor: active ? '#cccccc' : '#e0e0e0', // Default hover color
  },
}));


const CanvasControls = ({ fitToScreen, zoomIn, zoomOut }) => {
  return (
    <CanvasControlsContainer>
      <CanvasControlsButton onClick={fitToScreen} title="Fit to Screen">
        <ZoomOutMapIcon />
      </CanvasControlsButton>
      <CanvasControlsButton onClick={zoomIn} title="Zoom In">
        <AddIcon />
      </CanvasControlsButton>
      <CanvasControlsButton onClick={zoomOut} title="Zoom Out">
        <RemoveIcon/>
      </CanvasControlsButton>
    </CanvasControlsContainer>
  );
};

export default CanvasControls;