import { useState, useEffect } from "react";

const useVehicleTypeProperty = (property, updateElement, nodeId) => {
	const [actions, setActions] = useState(property.actions || []);

	useEffect(() => {
		setActions(property.actions || []);
	}, [property.actions]);

	const handleBlur = (field, value) => {
		const updatedProperty = { ...property, [field]: value };
		updateElement(nodeId, { vehicleTypeProperties: updatedProperty });
	};

	const updateAction = (index, updatedAction) => {
		const updatedActions = [...actions];
		updatedActions[index] = updatedAction;
		setActions(updatedActions);
		updateElement(nodeId, {
			vehicleTypeProperties: { ...property, actions: updatedActions },
		});
	};

	const addAction = () => {
		const newAction = {
			actionType: "",
			actionDescription: "",
			requirementType: "",
			blockingType: "",
			actionParameters: [],
		};
		const updatedActions = [...actions, newAction];
		setActions(updatedActions);
		updateElement(nodeId, {
			vehicleTypeProperties: { ...property, actions: updatedActions },
		});
	};

	const removeAction = (index) => {
		const updatedActions = actions.filter((_, i) => i !== index);
		setActions(updatedActions);
		updateElement(nodeId, {
			vehicleTypeProperties: { ...property, actions: updatedActions },
		});
	};

	return {
		actions,
		handleBlur,
		updateAction,
		addAction,
		removeAction,
	};
};

export default useVehicleTypeProperty;
