// src/components/ToolPanel.js
import React from 'react';
import { IconButton, Box } from '@mui/material';
import { FaMousePointer, FaRegDotCircle, FaBezierCurve } from 'react-icons/fa';
import styles from './ToolPanel.module.css';

const ToolPanel = ({ selectedTool, setSelectedTool }) => {
  const handleToolChange = (tool) => {
    setSelectedTool(tool);
  };

  return (
    <Box className={styles.toolPanel}>
      <IconButton
        className={`${styles.toolButton} ${selectedTool === 'select' ? styles.active : ''}`}
        onClick={() => handleToolChange('select')}
        title='select-tool-button'
      >
        <FaMousePointer />
      </IconButton>
      <IconButton
        className={`${styles.toolButton} ${selectedTool === 'draw-node' ? styles.active : ''}`}
        onClick={() => handleToolChange('draw-node')}
        title='draw-node-tool-button'
      >
        <FaRegDotCircle />
      </IconButton>
      <IconButton
        className={`${styles.toolButton} ${selectedTool === 'draw-edge' ? styles.active : ''}`}
        onClick={() => handleToolChange('draw-edge')}
        title='draw-edge-tool-button'
      >
        <FaBezierCurve />
      </IconButton>
    </Box>
  );
};

export default ToolPanel;