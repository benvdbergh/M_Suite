// src/components/ToolPanel.js
import React from 'react';
import { FaMousePointer, FaRegDotCircle, FaBezierCurve } from 'react-icons/fa';
import styles from './ToolPanel.module.css';

const ToolPanel = ({ selectedTool, setSelectedTool }) => {
  const handleToolChange = (tool) => {
    // console.log("Changing tool to:", tool); // Debug: Check tool change
    setSelectedTool(tool);
  };

  return (
    <div className={styles.toolPanel}>
      <button
        className={`${styles.toolButton} ${selectedTool === 'select' ? styles.active : ''}`}
        onClick={() => handleToolChange('select')}
        title='select-tool-button'
      >
        <FaMousePointer />
      </button>
      <button
        className={`${styles.toolButton} ${selectedTool === 'draw-node' ? styles.active : ''}`}
        onClick={() => handleToolChange('draw-node')}
        title='draw-node-tool-button'
      >
        <FaRegDotCircle />
      </button>
      <button
        className={`${styles.toolButton} ${selectedTool === 'draw-edge' ? styles.active : ''}`}
        onClick={() => handleToolChange('draw-edge')}
        title='draw-edge-tool-button'
      >
        <FaBezierCurve />
      </button>
    </div>
  );
};

export default ToolPanel;