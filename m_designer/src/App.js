// src/App.js
import React, { useState } from 'react';
import Canvas from './components/Canvas';
import ToolPanel from './components/ToolPanel';
import PropertiesSidebar from './components/PropertiesSidebar';
import './App.css';

const App = () => {
  const [selectedTool, setSelectedTool] = useState('select');
  const [selectedElement, setSelectedElement] = useState(null);
  const [elements, setElements] = useState([]);

  const updateElement = (id, newLabel) => {
    setElements((prevElements) =>
      prevElements.map((el) =>
        el.data.id === id ? { ...el, data: { ...el.data, label: newLabel } } : el
      )
    );
    setSelectedElement((prevElement) => ({ ...prevElement, label: newLabel }));
  };

  return (
    <div className="App">
      <div className="tool-panel-container">
        <ToolPanel selectedTool={selectedTool} setSelectedTool={setSelectedTool} />
      </div>
      <div className="canvas-container">
        <Canvas
          selectedTool={selectedTool}
          setSelectedElement={setSelectedElement}
          elements={elements}
          setElements={setElements}
        />
      </div>
      <div className="sidebar">
        <PropertiesSidebar
          selectedElement={selectedElement}
          updateElement={updateElement}
        />
      </div>
    </div>
  );
};

export default App;
