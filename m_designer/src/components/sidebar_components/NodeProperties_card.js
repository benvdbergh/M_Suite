import React, { useState, useEffect } from 'react';
import { TextField } from '@mui/material';

const NodeProperties = ({ selectedElement, updateElement }) => {
  const [newName, setNewName] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newPosition, setNewPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (selectedElement) {
      setNewName(selectedElement.nodeName || '');
      setNewDescription(selectedElement.nodeDescription || '');
      setNewPosition(selectedElement.nodePosition || { x: 0, y: 0 });
    }
  }, [selectedElement]);

  const handleBlur = (field, value) => {
    if (selectedElement) {
      updateElement(selectedElement.nodeId, { [field]: value });
    }
  };

  return (
    <div>
      <TextField
        label="Node Name"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        onBlur={(e) => handleBlur('nodeName', e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Node Description"
        value={newDescription}
        onChange={(e) => setNewDescription(e.target.value)}
        onBlur={(e) => handleBlur('nodeDescription', e.target.value)}
        fullWidth
        margin="normal"
        multiline
        rows={3}
      />
      <TextField
        label="Node Position X"
        type="number"
        value={newPosition?.x}
        onChange={(e) => setNewPosition({ ...newPosition, x: e.target.value })}
        onBlur={(e) => handleBlur('nodePosition', { ...newPosition, x: e.target.value })}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Node Position Y"
        type="number"
        value={newPosition?.y}
        onChange={(e) => setNewPosition({ ...newPosition, y: e.target.value })}
        onBlur={(e) => handleBlur('nodePosition', { ...newPosition, y: e.target.value })}
        fullWidth
        margin="normal"
      />
    </div>
  );
};

export default NodeProperties;