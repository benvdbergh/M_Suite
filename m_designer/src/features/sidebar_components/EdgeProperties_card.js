import React, { useState, useEffect } from "react";
import {
	TextField,
	Typography,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Autocomplete,
	Box,
	IconButton,
} from "@mui/material";

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import VehicleTypeEdgePropertyCard from './VehicleTypeEdgeProperty_card';
import useElementProperties from '../../hooks/properties/useElementProperties';

const EdgePropertiesCard = ({ selectedElement, updateElement, project }) => {
	const {
		name,
		setName,
		description,
		setDescription,
		properties: vehicleTypeEdgeProperties,
		updateProperty: updateVehicleTypeEdgeProperty,
		addProperty: addVehicleTypeEdgeProperty,
		removeProperty: removeVehicleTypeProperty,
		handleBlur,
	} = useElementProperties(selectedElement, updateElement);

	const [nodeOptions, setNodeOptions] = useState([]);
	const [startNode, setStartNode] = useState(null);
  const [endNode, setEndNode] = useState(null);
  
	const [isSectionExpanded, setIsSectionExpanded] = useState(true);

	useEffect(() => {
		if (project) {
			setNodeOptions(
				project.layouts[0].nodes.map((node) => ({
					label: node.nodeName,
					id: node.nodeId,
				}))
			);
		}
  }, [project]);
  
  useEffect(() => {
    if (selectedElement) { 
      setStartNode(nodeOptions.find(option => option.id === selectedElement.startNodeId) || null);
      setEndNode(nodeOptions.find(option => option.id === selectedElement.endNodeId) || null);
    }
  }, [selectedElement, nodeOptions]);



	return (
		<Box>
			<Accordion
				expanded={isSectionExpanded}
				onChange={() => setIsSectionExpanded(!isSectionExpanded)}
			>
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
						value={name}
						onChange={(e) => setName(e.target.value)}
						onBlur={(e) => handleBlur("edgeName", e.target.value)}
						fullWidth
					/>
					<TextField
						label="Edge Description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						onBlur={(e) => handleBlur("edgeDescription", e.target.value)}
						fullWidth
						multiline
						rows={4}
					/>
					<Autocomplete
						value={startNode}
						options={nodeOptions}
						getOptionLabel={(option) => option.label}
						renderInput={(params) => (
							<TextField {...params} label="Start Node" />
						)}
						onChange={(event, newValue) => {
							setStartNode(newValue);
							if (newValue.id) {
								updateElement(selectedElement.edgeId, {
									startNodeId: newValue.id,
								});
							}
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
							if (newValue.id) {
								updateElement(selectedElement.edgeId, {
									endNodeId: newValue.id,
								});
							}
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
					updateElement={(updatedProperty) =>
						updateVehicleTypeEdgeProperty(index, updatedProperty)
					}
					nodeId={selectedElement.edgeId}
					id={index}
					removeParameter={() => removeVehicleTypeProperty(index)}
				/>
			))}
			<Box display="flex" justifyContent="flex-end">
				<IconButton
					onClick={() =>
						addVehicleTypeEdgeProperty({
							vehicleTypeId: "",
							vehicleOrientation: 0,
							orientationType: "",
							rotationAllowed: false,
							rotationAtStartNodeAllowed: "",
							rotationAtEndNodeAllowed: "",
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
export default EdgePropertiesCard;