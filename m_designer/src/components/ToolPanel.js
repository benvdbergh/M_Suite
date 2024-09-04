// src/components/ToolPanel.js
import React from 'react';
import { IconButton, Box } from '@mui/material';
import MouseIcon from '@mui/icons-material/Mouse';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import TimelineIcon from '@mui/icons-material/Timeline';
import { styled } from '@mui/system';

const ToolPanelContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
});

const ToolButton = styled(IconButton)(({ active }) => ({
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: '10px',
  fontSize: '20px',
  color: '#666',
  marginBottom: '10px',
  backgroundColor: active ? '#cccccc' : 'transparent',
  '&:hover': {
    backgroundColor: active ? '#cccccc' : '#e0e0e0', // Default hover color
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