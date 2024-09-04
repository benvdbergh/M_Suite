import React from 'react';
import { IconButton, Box } from '@mui/material';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { styled } from '@mui/system';

const CanvasControlsContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: theme.spacing(1),
  right: theme.spacing(1),
  display: 'flex',
  flexDirection: 'column',
}));

const CanvasControlsButton = styled(IconButton)(({ theme, active }) => ({
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: theme.spacing(1),
  fontSize: theme.typography.pxToRem(20),
  color: active ? theme.palette.primary.main : theme.palette.text.secondary,
  backgroundColor: active ? theme.palette.action.selected : 'transparent',
  '&:hover': {
    backgroundColor: active ? theme.palette.action.selected : theme.palette.action.hover,
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