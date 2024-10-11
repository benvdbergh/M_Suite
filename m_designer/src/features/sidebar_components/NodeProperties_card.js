import React, { useState } from "react";
import {
	Accordion,
	TextField,
	Typography,
	AccordionSummary,
	AccordionDetails,
	Box,
	IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import VehicleTypeNodePropertyCard from "./VehicleTypeNodeProperty_card";
import useElementProperties from "../../hooks/useElementProperties";

const NodePropertiesCard = ({ selectedElement, updateElement }) => {
	const {
		name,
		setName,
		description,
		setDescription,
		position,
		setPosition,
		properties: vehicleTypeNodeProperties,
		updateProperty: updateVehicleTypeNodeProperty,
		addProperty: addVehicleTypeNodeProperty,
		removeProperty: removeVehicleTypeProperty,
		handleBlur,
	} = useElementProperties(selectedElement, updateElement);

	const [isSectionExpanded, setIsSectionExpanded] = useState(true);

	return (
		<Box>
			<Accordion
				expanded={isSectionExpanded}
				onChange={() => setIsSectionExpanded(!isSectionExpanded)}
			>
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
						value={name}
						onChange={(e) => setName(e.target.value)}
						onBlur={(e) => handleBlur("nodeName", e.target.value)}
						fullWidth
						margin="normal"
					/>
					<TextField
						label="Node Description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						onBlur={(e) => handleBlur("nodeDescription", e.target.value)}
						fullWidth
						margin="normal"
						multiline
						rows={3}
					/>
					<TextField
						label="Node Position X"
						type="number"
						value={position?.x}
						onChange={(e) => setPosition({ ...position, x: e.target.value })}
						onBlur={(e) =>
							handleBlur("nodePosition", { ...position, x: e.target.value })
						}
						fullWidth
						margin="normal"
					/>
					<TextField
						label="Node Position Y"
						type="number"
						value={position?.y}
						onChange={(e) => setPosition({ ...position, y: e.target.value })}
						onBlur={(e) =>
							handleBlur("nodePosition", { ...position, y: e.target.value })
						}
						fullWidth
						margin="normal"
					/>
				</AccordionDetails>
			</Accordion>
			{vehicleTypeNodeProperties.map((property, index) => (
				<VehicleTypeNodePropertyCard
					key={index}
					property={property}
					updateElement={(updatedProperty) =>
						updateVehicleTypeNodeProperty(index, updatedProperty)
					}
					nodeId={selectedElement.nodeId}
					id={index}
					removeParameter={() => removeVehicleTypeProperty(index)}
				/>
			))}
			<Box display="flex" justifyContent="flex-end">
				<IconButton
					onClick={() =>
						addVehicleTypeNodeProperty({
							vehicleTypeId: "",
							theta: 0,
							actions: [],
						})
					}
					color="primary"
				>
					<AddCircleOutlineIcon />
				</IconButton>
			</Box>
		</Box>
	);
};

export default NodePropertiesCard;
