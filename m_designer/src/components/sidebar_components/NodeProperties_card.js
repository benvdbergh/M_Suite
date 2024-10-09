import React, { useState, useEffect } from 'react';
import { Accordion, TextField, Typography, AccordionSummary, AccordionDetails} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const NodeProperties = ({ selectedElement, updateElement }) => {
  const [newName, setNewName] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newPosition, setNewPosition] = useState({ x: 0, y: 0 });
  
  const [isSectionExpanded, setIsSectionExpanded] = useState(true);

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

  const toggleSection = () => {
    setIsSectionExpanded(!isSectionExpanded);
  };

  return (
    <Accordion expanded={isSectionExpanded} onChange={toggleSection}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6">Node Info</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TextField
          label="Node Id"
          value={selectedElement?.nodeId}
          fullWidth
          disabled
          margin="normal"
        />
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
      </AccordionDetails>
    </Accordion>
  );
};

export default NodeProperties;