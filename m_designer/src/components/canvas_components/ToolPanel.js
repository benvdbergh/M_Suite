// src/components/ToolPanel.js
import React from 'react';
import { IconButton, Box } from '@mui/material';
import MouseIcon from '@mui/icons-material/Mouse';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import TimelineIcon from '@mui/icons-material/Timeline';
import { styled } from '@mui/system';
import { useTool } from '../../contexts/ToolContext';
import ToolTypes from '../../constants/ToolTypes';

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
        onClick={() => handleToolChange(ToolTypes.SELECT)}
        title='select-tool-button'
        sx={{
          color: selectedTool === ToolTypes.SELECT ? 'primary.main' : 'text.secondary',
          backgroundColor: selectedTool === ToolTypes.SELECT ? 'action.selected' : 'transparent',
        }}
      >
        <MouseIcon />
      </ToolButton>
      <ToolButton
        onClick={() => handleToolChange(ToolTypes.DRAW_PATH)}
        title='draw-path-tool-button'
        sx={{
          color: selectedTool === ToolTypes.DRAW_PATH ? 'primary.main' : 'text.secondary',
          backgroundColor: selectedTool === ToolTypes.DRAW_PATH ? 'action.selected' : 'transparent',
        }}
      >
        <TimelineIcon />
      </ToolButton>
      <ToolButton
        onClick={() => handleToolChange(ToolTypes.DRAW_NODE)}
        title='draw-node-tool-button'
        sx={{
          color: selectedTool === ToolTypes.DRAW_NODE ? 'primary.main' : 'text.secondary',
          backgroundColor: selectedTool === ToolTypes.DRAW_NODE ? 'action.selected' : 'transparent',
        }}
      >
        <RadioButtonUncheckedIcon />
      </ToolButton>
    </ToolPanelContainer>
  );
};

export default ToolPanel;