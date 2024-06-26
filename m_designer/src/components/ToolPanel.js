// src/components/ToolPanel.js
import React from 'react';
import { FaMousePointer, FaRegDotCircle, FaBezierCurve } from 'react-icons/fa';
import './ToolPanel.css';

const ToolPanel = ({ selectedTool, setSelectedTool }) => {
  const handleToolChange = (tool) => {
    // console.log("Changing tool to:", tool); // Debug: Check tool change
    setSelectedTool(tool);
  };

  return (
    <div className="tool-panel">
      <button
        className={`tool-button ${selectedTool === 'select' ? 'active' : ''}`}
        onClick={() => handleToolChange('select')}
      >
        <FaMousePointer />
      </button>
      <button
        className={`tool-button ${selectedTool === 'draw-node' ? 'active' : ''}`}
        onClick={() => handleToolChange('draw-node')}
      >
        <FaRegDotCircle />
      </button>
      <button
        className={`tool-button ${selectedTool === 'draw-edge' ? 'active' : ''}`}
        onClick={() => handleToolChange('draw-edge')}
      >
        <FaBezierCurve />
      </button>
    </div>
  );
};

export default ToolPanel;
