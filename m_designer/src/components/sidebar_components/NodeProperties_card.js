
import React, { useState, useEffect } from 'react';
import { Accordion, TextField, Typography, AccordionSummary, AccordionDetails, Box, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import VehicleTypeNodePropertyCard from './VehicleTypeNodeProperty_card';

const NodePropertiesCard = ({ selectedElement, updateElement }) => {
  const [newName, setNewName] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newPosition, setNewPosition] = useState({ x: 0, y: 0 });
  const [vehicleTypeNodeProperties, setVehicleTypeNodeProperties] = useState([]);

  const [isSectionExpanded, setIsSectionExpanded] = useState(true);

  useEffect(() => {
    if (selectedElement) {
      setNewName(selectedElement.nodeName || '');
      setNewDescription(selectedElement.nodeDescription || '');
      setNewPosition(selectedElement.nodePosition || { x: 0, y: 0 });
      setVehicleTypeNodeProperties(selectedElement.vehicleTypeNodeProperties || []);
    }
  }, [selectedElement]);

  const handleBlur = (field, value) => {
    if (selectedElement) {
      updateElement(selectedElement.nodeId, { [field]: value });
    }
  };

  const updateVehicleTypeNodeProperty = (index, updatedProperty) => {
    const updatedProperties = [...vehicleTypeNodeProperties];
    updatedProperties[index] = updatedProperty;
    setVehicleTypeNodeProperties(updatedProperties);
    updateElement(selectedElement.nodeId, { vehicleTypeNodeProperties: updatedProperties });
  };

  const addVehicleTypeNodeProperty = () => {
    const newProperty = {
      vehicleTypeId: '',
      theta: 0,
      actions: [],
    };
    const updatedProperties = [...vehicleTypeNodeProperties, newProperty];
    setVehicleTypeNodeProperties(updatedProperties);
    updateElement(selectedElement.nodeId, { vehicleTypeNodeProperties: updatedProperties });
  };

  const removeVehicleTypeProperty = (index) => {
    const updatedProperties = vehicleTypeNodeProperties.filter((_, i) => i !== index);
    setVehicleTypeNodeProperties(updatedProperties);
    updateElement(selectedElement.nodeId, { vehicleTypeNodeProperties: updatedProperties });
  };

  return (
    <Box>
      <Accordion expanded={isSectionExpanded} onChange={() => setIsSectionExpanded(!isSectionExpanded)}>
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
      {vehicleTypeNodeProperties.map((property, index) => (
        <VehicleTypeNodePropertyCard
          key={index}
          property={property}
          updateElement={(updatedProperty) => updateVehicleTypeNodeProperty(index, updatedProperty)}
          nodeId={selectedElement.nodeId}
          id={index}
          removeParameter={() => removeVehicleTypeProperty(index)}
        />
      ))}
      <Box display="flex" justifyContent="flex-end">
        <IconButton onClick={addVehicleTypeNodeProperty} color="primary">
          <AddCircleOutlineIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default NodePropertiesCard;