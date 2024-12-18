import React from "react";
import {
	Card,
	CardContent,
	Typography,
	TextField,
	Box,
	IconButton,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import ActionPropertiesCard from "./Action_card";
import useVehicleTypeProperty from "../../hooks/properties/useVehicleTypeProperty";

const VehicleTypeNodePropertyCard = ({
	property,
	updateElement,
	nodeId,
	id,
	removeParameter,
}) => {
	const { vehicleTypeId, setVehicleTypeId, theta, setTheta, actions, handleBlur, updateAction, addAction } =
		useVehicleTypeProperty(property, updateElement, nodeId);

	return (
		<Card variant="outlined" style={{ marginBottom: "10px" }}>
			<CardContent>
				<Box display="flex" alignItems="center" mb={1}>
					<Typography variant="h6" style={{ flexGrow: 1 }}>
						Vehicle Type Node Property
					</Typography>
					<IconButton onClick={() => removeParameter(id)} color="secondary">
						<RemoveCircleOutlineIcon />
					</IconButton>
				</Box>
				<TextField
					label="Vehicle Type ID"
					value={property.vehicleTypeId}
					onBlur={(e) => handleBlur("vehicleTypeId", e.target.value)}
					fullWidth
					margin="normal"
				/>
				<TextField
					label="Theta"
					type="number"
					value={property.theta}
					onBlur={(e) => handleBlur("theta", e.target.value)}
					fullWidth
					margin="normal"
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
			</CardContent>
		</Card>
	);
};

export default VehicleTypeNodePropertyCard;
