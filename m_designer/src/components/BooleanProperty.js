import React, { useState, useEffect } from "react";
import { FormControlLabel, Switch } from "@mui/material";

const BooleanProperty = ({ label, checked, onChange, ...otherProps }) => {
	const [switchChecked, setSwitchChecked] = useState(checked);

	useEffect(() => {
		setSwitchChecked(checked);
	}, [checked]);

	const handleChange = (event) => {
		setSwitchChecked(event.target.checked);
		onChange(event.target.checked);
	};

	return (
		<FormControlLabel
			control={<Switch checked={switchChecked} onChange={handleChange} />}
			label={label}
			{...otherProps}
		/>
	);
};

export default BooleanProperty;
