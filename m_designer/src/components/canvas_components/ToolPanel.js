// src/components/ToolPanel.js
import React from 'react';
import { IconButton, Box } from '@mui/material';
import MouseIcon from '@mui/icons-material/Mouse';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import TimelineIcon from '@mui/icons-material/Timeline';
import { styled } from '@mui/system';
import { useTool } from '../../contexts/ToolContext';

const ToolPanelContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
}));

const ToolButton = styled(IconButton)(({ theme }) => ({
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: theme.spacing(1),
  fontSize: theme.typography.pxToRem(20),
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const ToolPanel = () => {
  const { selectedTool, setSelectedTool } = useTool();

  const handleToolChange = (tool) => {
    setSelectedTool(tool);
  };

  return (
    <ToolPanelContainer>
      <ToolButton
        onClick={() => handleToolChange('select')}
        title='select-tool-button'
        sx={{
          color: selectedTool === 'select' ? 'primary.main' : 'text.secondary',
          backgroundColor: selectedTool === 'select' ? 'action.selected' : 'transparent',
        }}
      >
        <MouseIcon />
      </ToolButton>
      <ToolButton
        onClick={() => handleToolChange('draw-node')}
        title='draw-node-tool-button'
        sx={{
          color: selectedTool === 'draw-node' ? 'primary.main' : 'text.secondary',
          backgroundColor: selectedTool === 'draw-node' ? 'action.selected' : 'transparent',
        }}
      >
        <RadioButtonUncheckedIcon />
      </ToolButton>
      <ToolButton
        onClick={() => handleToolChange('draw-edge')}
        title='draw-edge-tool-button'
        sx={{
          color: selectedTool === 'draw-edge' ? 'primary.main' : 'text.secondary',
          backgroundColor: selectedTool === 'draw-edge' ? 'action.selected' : 'transparent',
        }}
      >
        <TimelineIcon />
      </ToolButton>
    </ToolPanelContainer>
  );
};

export default ToolPanel;