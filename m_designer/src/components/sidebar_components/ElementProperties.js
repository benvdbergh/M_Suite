import { React, useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import VehicleTypeNodePropertyCard from './VehicleTypeNodeProperty_card';
import VehicleTypeEdgePropertyCard from './VehicleTypeEdgeProperty_card';

const ElementProperties = ({ selectedElement, updateElement, addProperty }) => {
    const [vehicleTypeNodeProperties, setVehicleTypeNodeProperties] = useState([]);
    const [vehicleTypeEdgeProperties, setVehicleTypeEdgeProperties] = useState([]);

    useEffect(() => {
        if (selectedElement && selectedElement.vehicleTypeNodeProperties) {
          setVehicleTypeNodeProperties(selectedElement.vehicleTypeNodeProperties || []);
        }

        if (selectedElement && selectedElement.vehicleTypeEdgeProperties) {
          setVehicleTypeEdgeProperties(selectedElement.vehicleTypeEdgeProperties || []);
        }
      }, [selectedElement]);

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

    
    return (
    <div>
      <Box display="flex" alignItems="center" marginTop={2}>
        <Typography
          variant="body1"
          color="primary"
          onClick={addProperty}
          style={{ cursor: 'pointer' }}
        >
          + Add Property
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" marginTop={2}>
      {vehicleTypeNodeProperties.map((property, index) => (
        <VehicleTypeNodePropertyCard
          key={index}
          property={property}
          updateElement={updateElement}
          nodeId={selectedElement.id}
        />
      ))}
      </Box>
      <Box display="flex" alignItems="center" marginTop={2}>
      {vehicleTypeEdgeProperties.map((property, index) => (
        <VehicleTypeEdgePropertyCard
          key={index}
          property={property}
          updateElement={updateElement}
          elementId={selectedElement.id}
        />
      ))}
      </Box>
    </div>
  );
};

export default ElementProperties;