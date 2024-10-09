import React from 'react';
import { Card, CardContent, Typography, TextField } from '@mui/material';

const VehicleTypeEdgePropertyCard = ({ property, updateElement, nodeId }) => {
  const handleBlur = (field, value) => {
    const updatedProperty = { ...property, [field]: value };
    updateElement(nodeId, { vehicleTypeNodeProperties: updatedProperty });
  };

  return (
    <Card variant="outlined" style={{ marginBottom: '10px' }}>
      <CardContent>
        <Typography variant="h6">Vehicle Type Node Property</Typography>
        <TextField
          label="Vehicle Type ID"
          value={property.vehicleTypeId}
          onChange={(e) => handleBlur('vehicleTypeId', e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Theta"
          type="number"
          value={property.theta}
          onChange={(e) => handleBlur('theta', e.target.value)}
          fullWidth
          margin="normal"
        />
        {/* Add more fields for actions and other properties as needed */}
      </CardContent>
    </Card>
  );
};

export default VehicleTypeEdgePropertyCard;