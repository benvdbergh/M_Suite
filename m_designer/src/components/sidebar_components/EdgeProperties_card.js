import React, { useState, useEffect } from 'react';
import { TextField, Typography, Accordion, AccordionSummary, AccordionDetails, Autocomplete, Box, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import VehicleTypeEdgePropertyCard from './VehicleTypeEdgeProperty_card'; // Import the VehicleTypeEdgePropertyCard

const EdgePropertiesCard = ({ selectedElement, updateElement, project }) => {
  const [newName, setNewName] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [nodeOptions, setNodeOptions] = useState([]);
  const [startNode, setStartNode] = useState(null);
  const [endNode, setEndNode] = useState(null);
  const [vehicleTypeEdgeProperties, setVehicleTypeEdgeProperties] = useState([]);

  const [isSectionExpanded, setIsSectionExpanded] = useState(true);

  useEffect(() => {
    if (selectedElement) {
      setNewName(selectedElement.edgeName || '');
      setNewDescription(selectedElement.edgeDescription || '');
      setStartNode(nodeOptions.find(option => option.id === selectedElement.startNodeId) || null);
      setEndNode(nodeOptions.find(option => option.id === selectedElement.endNodeId) || null);
      setVehicleTypeEdgeProperties(selectedElement.vehicleTypeEdgeProperties || []);
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

  const updateVehicleTypeEdgeProperty = (index, updatedProperty) => {
    const updatedProperties = [...vehicleTypeEdgeProperties];
    updatedProperties[index] = updatedProperty;
    setVehicleTypeEdgeProperties(updatedProperties);
    updateElement(selectedElement.edgeId, { vehicleTypeEdgeProperties: updatedProperties });

  };

  const addVehicleTypeEdgeProperty = () => {
    const newProperty = {
      vehicleTypeId: '',
      vehicleOrientation: 0,
      orientationType: '',
      rotationAllowed: false,
      rotationAtStartNodeAllowed: '',
      rotationAtEndNodeAllowed: '',
      maxSpeed: 0,
      maxRotationSpeed: 0,
      minHeight: 0,
      maxHeight: 0,
      loadRestriction: {
        unloaded: false,
        loaded: false,
        loadSetNames: [],
      },
      actions: [],
      trajectory: {
        degree: 0,
        knotVector: [],
        controlPoints: [],
      },
      reentryAllowed: false,
    };
    const updatedProperties = [...vehicleTypeEdgeProperties, newProperty];
    setVehicleTypeEdgeProperties(updatedProperties);
    updateElement(selectedElement.edgeId, { vehicleTypeEdgeProperties: updatedProperties });
  };

  const removeVehicleTypeProperty = (index) => {
    const updatedParameters = vehicleTypeEdgeProperties.filter((_, i) => i !== index);
    setVehicleTypeEdgeProperties(updatedParameters);
  };


  return (
    <Box>
      <Accordion expanded={isSectionExpanded} onChange={() => setIsSectionExpanded(!isSectionExpanded)}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Edge Info</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            label="Edge Id"
            value={selectedElement?.edgeId}
            fullWidth
            disabled
          />
          <TextField
            label="Edge Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onBlur={(e) => handleBlur('edgeName', e.target.value)}
            fullWidth
          />
          <TextField
            label="Edge Description"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            onBlur={(e) => handleBlur('edgeDescription', e.target.value)}
            fullWidth
            multiline
            rows={4}
          />
          <Autocomplete
            value={startNode}
            options={nodeOptions}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => <TextField {...params} label="Start Node"/>}
            onChange={(event, newValue) => {
              setStartNode(newValue);
              if (newValue.id) { updateElement(selectedElement.edgeId, { startNodeId: newValue.id }); }
            }}
            disablePortal
            fullWidth
          />
          <Autocomplete
            value={endNode}
            options={nodeOptions}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => <TextField {...params} label="End Node" />}
            onChange={(event, newValue) => {
              setEndNode(newValue);
              if (newValue.id) { updateElement(selectedElement.edgeId, { endNodeId: newValue.id }); }
            }}
            disablePortal
            fullWidth
          />
        </AccordionDetails>
      </Accordion>
      {vehicleTypeEdgeProperties.map((property, index) => (
        <VehicleTypeEdgePropertyCard
          key={index}
          property={property}
          updateElement={(updatedProperty) => updateVehicleTypeEdgeProperty(index, updatedProperty)}
          nodeId={selectedElement.edgeId}
          id={index}
          removeParameter={() => removeVehicleTypeProperty(index)}
        />
      ))}
      <Box display="flex" justifyContent="flex-end">
        <IconButton onClick={addVehicleTypeEdgeProperty} color="primary">
          <AddCircleOutlineIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default EdgePropertiesCard;