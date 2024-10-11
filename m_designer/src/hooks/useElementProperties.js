import { useState, useEffect } from "react";

const useElementProperties = (selectedElement, updateElement) => {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const [properties, setProperties] = useState([]);

	useEffect(() => {
        if (selectedElement) {
            console.log(selectedElement);
			setName(selectedElement.nodeName || selectedElement.edgeName || "");
			setDescription(selectedElement.nodeDescription || selectedElement.edgeDescription || "");
			setPosition(selectedElement.nodePosition || { x: 0, y: 0 });
			setProperties(selectedElement.vehicleTypeNodeProperties || selectedElement.vehicleTypeEdgeProperties || []);
		}
	}, [selectedElement]);

	const handleBlur = (field, value) => {
		if (selectedElement) {
			updateElement(selectedElement.id, { [field]: value });
		}
	};

	const addProperty = (newProperty) => {
		const updatedProperties = [...properties, newProperty];
		setProperties(updatedProperties);
		updateElement(selectedElement.id, { properties: updatedProperties });
	};

	const updateProperty = (index, updatedProperty) => {
		const updatedProperties = [...properties];
		updatedProperties[index] = updatedProperty;
		setProperties(updatedProperties);
		updateElement(selectedElement.id, { properties: updatedProperties });
	};

	const removeProperty = (index) => {
		const updatedProperties = properties.filter((_, i) => i !== index);
		setProperties(updatedProperties);
		updateElement(selectedElement.id, { properties: updatedProperties });
	};

	return {
		name,
		setName,
		description,
		setDescription,
		position,
		setPosition,
		properties,
		updateProperty,
		addProperty,
		removeProperty,
		handleBlur,
	};
};

export default useElementProperties;
