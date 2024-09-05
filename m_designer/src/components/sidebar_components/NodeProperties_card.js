import React, { useState, useEffect } from 'react';
import { TextField, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const NodeProperties = ({ selectedElement, updateElement }) => {
  const [newId, setNewId] = useState('');
  const [newName, setNewName] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newPosition, setNewPosition] = useState({ x: 0, y: 0 });
  const [isSectionExpanded, setIsSectionExpanded] = useState(true);

  useEffect(() => {
    if (selectedElement) {
      setNewId(selectedElement.id || '');
      setNewName(selectedElement.label || '');
      setNewDescription(selectedElement.description || '');
      setNewPosition(selectedElement.position || { x: 0, y: 0 });
    }
  }, [selectedElement]);

  const handleBlur = (field, value) => {
    if (selectedElement) {
      updateElement(selectedElement.id, { [field]: value });
    }
  };

  const toggleSection = () => {
    setIsSectionExpanded(!isSectionExpanded);
  };

  return (
      <Accordion expanded={isSectionExpanded} onChange={toggleSection}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Basic Information</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            label="Node Id"
            value={newId}
            onBlur={(e) => handleBlur('id', e.target.value)}
            fullWidth
            slotProps={{
                input: {
                  readOnly: true,
                },
              }}
            margin="normal"
          />
          <TextField
            label="Node Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onBlur={(e) => handleBlur('id', e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Node Description"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            onBlur={(e) => handleBlur('description', e.target.value)}
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
            onBlur={(e) => handleBlur('position', { ...newPosition, x: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Node Position Y"
            type="number"
            value={newPosition?.y}
            onChange={(e) => setNewPosition({ ...newPosition, y: e.target.value })}
            onBlur={(e) => handleBlur('position', { ...newPosition, y: e.target.value })}
            fullWidth
            margin="normal"
          />
        </AccordionDetails>
      </Accordion>
  );
};

export default NodeProperties;