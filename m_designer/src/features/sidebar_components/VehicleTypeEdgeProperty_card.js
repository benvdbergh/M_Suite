import React, { useState } from "react";
import {
	Typography,
	TextField,
	Box,
	IconButton,
	Switch,
	FormControlLabel,
	Accordion,
	AccordionSummary,
	AccordionDetails,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import ActionPropertiesCard from "./Action_card";
import useVehicleTypeProperty from "../../hooks/useVehicleTypeProperty";

const VehicleTypeEdgePropertyCard = ({
	property,
	updateElement,
	nodeId,
	id,
	removeParameter,
}) => {
	const { actions, handleBlur, updateAction, addAction, removeAction } =
		useVehicleTypeProperty(property, updateElement, nodeId);

	const [isSectionExpanded, setIsSectionExpanded] = useState(true);

	return (
		<Accordion
			expanded={isSectionExpanded}
			onChange={() => setIsSectionExpanded(!isSectionExpanded)}
		>
			<AccordionSummary>
				<Box display="flex" alignItems="center" mb={1}>
					<TextField
						label="Vehicle Type ID"
						value={property.vehicleTypeId}
						onChange={(e) => handleBlur("vehicleTypeId", e.target.value)}
						fullWidth
						margin="normal"
					/>
					<IconButton onClick={() => removeParameter(id)} color="secondary">
						<RemoveCircleOutlineIcon />
					</IconButton>
				</Box>
			</AccordionSummary>
			<AccordionDetails>
				<TextField
					label="Vehicle Orientation"
					type="number"
					value={property.vehicleOrientation}
					onChange={(e) => handleBlur("vehicleOrientation", e.target.value)}
					fullWidth
					margin="normal"
				/>
				<TextField
					label="Orientation Type"
					value={property.orientationType}
					onChange={(e) => handleBlur("orientationType", e.target.value)}
					fullWidth
					margin="normal"
				/>
				<FormControlLabel
					control={
						<Switch
							checked={property.rotationAllowed}
							onChange={(e) => handleBlur("rotationAllowed", e.target.checked)}
						/>
					}
					label="Rotation Allowed"
				/>
        <TextField
          label="Rotation at Start Node Allowed"
          value={property.rotationAtStartNodeAllowed}
          onChange={(e) => handleBlur('rotationAtStartNodeAllowed', e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Rotation at End Node Allowed"
          value={property.rotationAtEndNodeAllowed}
          onChange={(e) => handleBlur('rotationAtEndNodeAllowed', e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Max Speed"
          type="number"
          value={property.maxSpeed}
          onChange={(e) => handleBlur('maxSpeed', e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Max Rotation Speed"
          type="number"
          value={property.maxRotationSpeed}
          onChange={(e) => handleBlur('maxRotationSpeed', e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Min Height"
          type="number"
          value={property.minHeight}
          onChange={(e) => handleBlur('minHeight', e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Max Height"
          type="number"
          value={property.maxHeight}
          onChange={(e) => handleBlur('maxHeight', e.target.value)}
          fullWidth
          margin="normal"
        />
        <Typography variant="subtitle1" gutterBottom>
          Load Restriction
        </Typography>
        <FormControlLabel
          control={
            <Switch
              checked={property.loadRestriction ? property.loadRestriction.unloaded : false}
              onChange={(e) => handleBlur('loadRestriction.unloaded', e.target.checked)}
            />
          }
          label="Unloaded"
        />
        <FormControlLabel
          control={
            <Switch
              checked={property.loadRestriction ? property.loadRestriction.loaded : false}
              onChange={(e) => handleBlur('loadRestriction.loaded', e.target.checked)}
            />
          }
          label="Loaded"
        />
        <TextField
          label="Load Set Names"
          value={property.loadRestriction ? property.loadRestriction.loadSetNames.join(', ') : ''}
          onChange={(e) => handleBlur('loadRestriction.loadSetNames', e.target.value.split(',').map(name => name.trim()))}
          fullWidth
          margin="normal"
        />
        <FormControlLabel
          control={
            <Switch
              checked={property.reentryAllowed}
              onChange={(e) => handleBlur('reentryAllowed', e.target.checked)}
            />
          }
          label="Reentry Allowed"
        />
				<Typography variant="subtitle1" gutterBottom>
					Actions
				</Typography>
				{actions.map((action, index) => (
					<ActionPropertiesCard
						key={index}
						action={action}
						updateAction={(updatedAction) => updateAction(index, updatedAction)}
					/>
				))}
				<Box display="flex" justifyContent="flex-end">
					<IconButton onClick={addAction} color="primary">
						<AddCircleOutlineIcon />
					</IconButton>
				</Box>
			</AccordionDetails>
		</Accordion>
	);
};

export default VehicleTypeEdgePropertyCard;
