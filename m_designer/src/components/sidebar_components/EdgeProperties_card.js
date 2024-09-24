import React, { useState, useEffect } from 'react';
import { TextField, Typography, Accordion, AccordionSummary, AccordionDetails, Autocomplete } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const EdgeProperties = ({ selectedElement, updateElement, project }) => {
  const [newName, setNewName] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [startNodeId, setStartNodeId] = useState('');
  const [endNodeId, setEndNodeId] = useState('');
  const [nodeOptions, setNodeOptions] = useState([]);

  const [isSectionExpanded, setIsSectionExpanded] = useState(true);


  useEffect(() => {
    if (selectedElement) {
      setNewName(selectedElement.edgeName || '');
      setNewDescription(selectedElement.edgeDescription || '');
      setStartNodeId(selectedElement.startNodeId || '');
      setEndNodeId(selectedElement.endNodeId || '');
    }
    console.log(selectedElement);
  }, [selectedElement]);

  useEffect(() => {
    console.log('map data', project);
    if (project) {

      console.log(project);
      setNodeOptions(project.layouts[0].nodes.map(node => ({ label: node.nodeName, id: node.nodeId })));
    }
  }, [project]);

  const handleBlur = (field, value) => {
    if (selectedElement) {
      updateElement(selectedElement.edgeId, { [field]: value });
    }
  };

  const toggleSection = () => {
    setIsSectionExpanded(!isSectionExpanded);
  };

  return (
      <Accordion expanded={isSectionExpanded} onChange={toggleSection}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Edge Info</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            label="Edge Id"
            value={selectedElement?.edgeId}
            fullWidth
            disabled
            margin="normal"
          />
          <TextField
            label="Edge Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onBlur={(e) => handleBlur('edgeName', e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Edge Description"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            onBlur={(e) => handleBlur('edgeDescription', e.target.value)}
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