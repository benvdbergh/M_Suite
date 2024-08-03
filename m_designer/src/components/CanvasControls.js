import React from 'react';
import { FaExpand, FaPlus, FaMinus } from 'react-icons/fa';
import './CanvasControls.css';

const CanvasControls = ({ fitToScreen, zoomIn, zoomOut }) => {
  return (
    <div className="canvas-controls">
      <button onClick={fitToScreen} title="Fit to Screen" className="fit-to-screen">
        <FaExpand />
      </button>
      <button onClick={zoomIn} title="Zoom In">
        <FaPlus />
      </button>
      <button onClick={zoomOut} title="Zoom Out">
        <FaMinus />
      </button>
    </div>
  );
};

export default CanvasControls;