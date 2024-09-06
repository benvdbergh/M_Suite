import React from 'react';
import { useCy } from '../../contexts/CytoContext';
import { IconButton, Box } from '@mui/material';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { styled } from '@mui/system';

const ZoomControlsContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: theme.spacing(1),
  right: theme.spacing(1),
  display: 'flex',
  flexDirection: 'column',
}));

const ZoomControlsButton = styled(IconButton)(({ theme, active }) => ({
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

const ZoomControls = () => {
  const { cyInstance } = useCy();

  const fitToScreen = () => {
    if (cyInstance) {
      cyInstance.fit();
    }
  };

  const zoomIn = () => {
    if (cyInstance) {
      cyInstance.zoom(cyInstance.zoom() + 0.1);
    }
  };

  const zoomOut = () => {
    if (cyInstance) {
      cyInstance.zoom(cyInstance.zoom() - 0.1);
    }
  };

  return (
    <ZoomControlsContainer>
      <ZoomControlsButton onClick={fitToScreen} title="Fit to Screen">
        <ZoomOutMapIcon />
      </ZoomControlsButton>
      <ZoomControlsButton onClick={zoomIn} title="Zoom In">
        <AddIcon />
      </ZoomControlsButton>
      <ZoomControlsButton onClick={zoomOut} title="Zoom Out">
        <RemoveIcon />
      </ZoomControlsButton>
    </ZoomControlsContainer>
  );
};

export default ZoomControls;