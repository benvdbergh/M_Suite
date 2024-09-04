import React, { useState, useEffect } from 'react';
import { TextField, Typography, Accordion, AccordionSummary, AccordionDetails, Paper } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/system';

const PropertyContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
}));

const NodeProperties = ({ selectedElement, updateElement }) => {
  const [newLabel, setNewLabel] = useState('');
  const [newName, setNewName] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newPosition, setNewPosition] = useState({ x: 0, y: 0 });
  const [isSectionExpanded, setIsSectionExpanded] = useState(true);

  useEffect(() => {
    if (selectedElement) {
      setNewLabel(selectedElement.label || '');
      setNewName(selectedElement.id || '');
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
    <PropertyContainer elevation={3}>
      <Accordion expanded={isSectionExpanded} onChange={toggleSection}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Basic Information</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            label="Node Label"
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            onBlur={(e) => handleBlur('label', e.target.value)}
            fullWidth
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
            rows={4}
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
    </PropertyContainer>
  );
};

export default NodeProperties;