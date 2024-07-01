import React, { useState, useEffect } from 'react';
import { FaEdit } from 'react-icons/fa';
// import './NodeProperties.css';

const NodeProperties = ({ selectedElement, updateElement }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newLabel, setNewLabel] = useState('');
  const [newName, setNewName] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newPosition, setNewPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (selectedElement) {
      setNewLabel(selectedElement.label || '');
      setNewName(selectedElement.nodeName || '');
      setNewDescription(selectedElement.nodeDescription || '');
      setNewPosition(selectedElement.nodePosition);
    }
  }, [selectedElement]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSubmit = () => {
    if (selectedElement && newLabel !== '') {
      updateElement(selectedElement.id, {
        label: newLabel,
        nodeName: newName,
        nodeDescription: newDescription,
        nodePosition: newPosition,
      });
    }
    setIsEditing(false);
  };

  return (
    <div className="property">
      <label>Node Label:</label>
      {isEditing ? (
        <>
          <input
            type="text"
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
          />
          <label>Node Name:</label>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <label>Node Description:</label>
          <textarea
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
          <label>Node Position:</label>
          <input
            type="number"
            value={newPosition?.x}
            onChange={(e) => setNewPosition({ ...newPosition, x: e.target.value })}
          />
          <input
            type="number"
            value={newPosition?.y}
            onChange={(e) => setNewPosition({ ...newPosition, y: e.target.value })}
          />
          <button onClick={handleSubmit}>Submit</button>
        </>
      ) : (
        <div className="label-container">
          <span>{selectedElement.label}</span>
          <span>{selectedElement.nodeName}</span>
          <span>{selectedElement.nodeDescription}</span>
          <span>Position: ({selectedElement.position?.x}, {selectedElement.position?.y})</span>
          <FaEdit className="edit-icon" onClick={handleEditClick} />
        </div>
      )}
    </div>
  );
};

export default NodeProperties;