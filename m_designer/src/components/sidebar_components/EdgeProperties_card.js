import React, { useState, useEffect } from 'react';
import { TextField, Typography, Accordion, AccordionSummary, AccordionDetails, Autocomplete } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const EdgeProperties = ({ selectedElement, updateElement, mapData }) => {
  const [newId, setNewId] = useState('');
  const [newName, setNewName] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [startNodeId, setStartNodeId] = useState('');
  const [endNodeId, setEndNodeId] = useState('');
  const [nodeOptions, setNodeOptions] = useState([]);

  const [isSectionExpanded, setIsSectionExpanded] = useState(true);

  useEffect(() => {
    if (selectedElement) {
      setNewId(selectedElement.id || '');
      setNewName(selectedElement.label || '');
      setNewDescription(selectedElement.description || '');
      setStartNodeId(selectedElement.source || '');
      setEndNodeId(selectedElement.target || '');
    }
    console.log(selectedElement);
  }, [selectedElement]);

  useEffect(() => {
    console.log('map data', mapData);
    if (mapData) {

      console.log(mapData);
      setNodeOptions(mapData.layouts[0].nodes.map(node => ({ label: node.nodeName, id: node.nodeId })));
    }
  },
  [mapData]);

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
            label="Edge Id"
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
            label="Edge Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onBlur={(e) => handleBlur('id', e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Edge Description"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            onBlur={(e) => handleBlur('description', e.target.value)}
            fullWidth
            margin="normal"
            multiline
            rows={4}
          />
          <Autocomplete
            value={startNodeId}
            options={nodeOptions}
            renderInput={(params) => <TextField {...params} label="Start Node" variant="standard" />}
            onChange={(event, newValue) => {
              setStartNodeId(newValue);
            }}
            disablePortal
            fullWidth
            margin="normal"
          />
          <Autocomplete
            value={endNodeId}
            options={nodeOptions}
            renderInput={(params) => <TextField {...params} label="End Node" variant="standard" />}
            onChange={(event, newValue) => {
              setEndNodeId(newValue);
            }}
            disablePortal
            fullWidth
            margin="normal"
          />
        </AccordionDetails>
      </Accordion>
  );
};

export default EdgeProperties;