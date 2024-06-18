// src/components/PropertiesSidebar.js
import React, { useState, useEffect } from 'react';
import { FaEdit } from 'react-icons/fa';
import './PropertiesSidebar.css';

const PropertiesSidebar = ({ selectedElement, updateElement }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newLabel, setNewLabel] = useState('');

  useEffect(() => {
    if (selectedElement) {
      setNewLabel(selectedElement.label);
    }
  }, [selectedElement]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSubmit = () => {
    if (selectedElement && newLabel !== '') {
      updateElement(selectedElement.id, newLabel);
    }
    setIsEditing(false);
  };

  if (!selectedElement) {
    return <div className="properties-sidebar">No element selected</div>;
  }
  
  return (
    <div className="properties-sidebar">
      {selectedElement.group === 'nodes' && (
        <div className="property">
          <label>Node Label:</label>
          {isEditing ? (
            <>
              <input
                type="text"
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
              />
              <button onClick={handleSubmit}>Submit</button>
            </>
          ) : (
            <div className="label-container">
              <span>{selectedElement.label}</span>
              <FaEdit className="edit-icon" onClick={handleEditClick} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PropertiesSidebar;
