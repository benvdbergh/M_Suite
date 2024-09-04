import React, { useState, useEffect } from 'react';
import { TextField, Typography, Box, Collapse, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/system';

const PropertyContainer = styled(Box)({
  padding: '20px',
  border: '1px solid #ddd',
  borderRadius: '5px',
  backgroundColor: '#f9f9f9',
  marginBottom: '20px',
});

const SectionContainer = styled(Box)({
  marginBottom: '20px',
});

const SectionHeader = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
});

const SectionContent = styled(Box)({
  padding: '10px 0',
});

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
    <PropertyContainer>
      <SectionContainer>
        <SectionHeader onClick={toggleSection}>
          <Typography variant="h6">Basic Information</Typography>
          <IconButton>
            <ExpandMoreIcon />
          </IconButton>
        </SectionHeader>
        <Collapse in={isSectionExpanded}>
          <SectionContent>
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
          </SectionContent>
        </Collapse>
      </SectionContainer>
    </PropertyContainer>
  );
};

export default NodeProperties;