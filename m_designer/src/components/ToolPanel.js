// src/components/ToolPanel.js
import React from 'react';
import { IconButton, Box } from '@mui/material';
import MouseIcon from '@mui/icons-material/Mouse';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import TimelineIcon from '@mui/icons-material/Timeline';
import { styled } from '@mui/system';

const ToolPanelContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
}));

const ToolButton = styled(IconButton)(({ theme, active }) => ({
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: theme.spacing(1),
  fontSize: theme.typography.pxToRem(20),
  color: active ? theme.palette.primary.main : theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
  backgroundColor: active ? theme.palette.action.selected : 'transparent',
  '&:hover': {
    backgroundColor: active ? theme.palette.action.selected : theme.palette.action.hover,
  },
}));

const ToolPanel = ({ selectedTool, setSelectedTool }) => {
  const handleToolChange = (tool) => {
    setSelectedTool(tool);
  };

  return (
    <ToolPanelContainer>
      <ToolButton
        active={selectedTool === 'select'}
        onClick={() => handleToolChange('select')}
        title='select-tool-button'
      >
        <MouseIcon />
      </ToolButton>
      <ToolButton
        active={selectedTool === 'draw-node'}
        onClick={() => handleToolChange('draw-node')}
        title='draw-node-tool-button'
      >
        <RadioButtonUncheckedIcon />
      </ToolButton>
      <ToolButton
        active={selectedTool === 'draw-edge'}
        onClick={() => handleToolChange('draw-edge')}
        title='draw-edge-tool-button'
      >
        <TimelineIcon />
      </ToolButton>
    </ToolPanelContainer>
  );
};

export default ToolPanel;