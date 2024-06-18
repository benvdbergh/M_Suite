// src/components/PropertiesSidebar.js
import React from 'react';
import './PropertiesSidebar.css';

const PropertiesSidebar = ({ selectedElement }) => {
  return (
    <div className="properties-sidebar">
      {selectedElement ? (
        <div>
          <h3>Properties</h3>
          <p>ID: {selectedElement.id}</p>
          <p>Label: {selectedElement.label}</p>
        </div>
      ) : (
        <p>Select an element to see its properties.</p>
      )}
    </div>
  );
};

export default PropertiesSidebar;
