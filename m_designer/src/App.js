// src/App.js
import React, { useState } from 'react';
import Canvas from './components/Canvas';
import ToolPanel from './components/ToolPanel';
import PropertiesSidebar from './components/PropertiesSidebar';
import './App.css';

const App = () => {
  const [selectedTool, setSelectedTool] = useState('select');
  const [selectedElement, setSelectedElement] = useState(null);

  return (
    <div className="App">
      <div className="tool-panel-container">
        <ToolPanel selectedTool={selectedTool} setSelectedTool={setSelectedTool} />
      </div>
      <div className="canvas-container">
        <Canvas selectedTool={selectedTool} setSelectedElement={setSelectedElement} />
      </div>
      <div className="sidebar">
        <PropertiesSidebar selectedElement={selectedElement} />
      </div>
    </div>
  );
};

export default App;
