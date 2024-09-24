import React, { useState, useEffect } from 'react';
import { TextField, Typography, Accordion, AccordionSummary, AccordionDetails, Autocomplete } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const EdgeProperties = ({ selectedElement, updateElement, project }) => {
  const [newName, setNewName] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [nodeOptions, setNodeOptions] = useState([]);
  const [startNode, setStartNode] = useState(null);
  const [endNode, setEndNode] = useState(null);

  const [isSectionExpanded, setIsSectionExpanded] = useState(true);

  useEffect(() => {
    if (selectedElement) {
      setNewName(selectedElement.edgeName || '');
      setNewDescription(selectedElement.edgeDescription || '');
      setStartNode(nodeOptions.find(option => option.id === selectedElement.startNodeId) || null);
      setEndNode(nodeOptions.find(option => option.id === selectedElement.endNodeId) || null);
    }
    console.log(selectedElement);
  }, [selectedElement, nodeOptions]);

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

  const handleNodeChange = (field, newValue) => {
    if (selectedElement && newValue) {
      updateElement(selectedElement.edgeId, { [field]: newValue.id });
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
          value={startNode}
          options={nodeOptions}
          getOptionLabel={(option) => option.label}
          renderInput={(params) => <TextField {...params} label="Start Node" variant="standard" />}
          onChange={(event, newValue) => {
            setStartNode(newValue);
            handleNodeChange('startNodeId', newValue);
          }}
          disablePortal
          fullWidth
          margin="normal"
        />
        <Autocomplete
          value={endNode}
          options={nodeOptions}
          getOptionLabel={(option) => option.label}
          renderInput={(params) => <TextField {...params} label="End Node" variant="standard" />}
          onChange={(event, newValue) => {
            setEndNode(newValue);
            handleNodeChange('endNodeId', newValue);
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