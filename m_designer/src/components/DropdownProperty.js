import React, { useState, useEffect } from "react";
import { Autocomplete as MuiAutocomplete, TextField } from "@mui/material";

const DropdownProperty = ({ label, value, options, onChange, ...otherProps }) => {
	const [selectedValue, setSelectedValue] = useState(value);

	useEffect(() => {
		setSelectedValue(value);
	}, [value]);

	const handleChange = (event, newValue) => {
		setSelectedValue(newValue);
		onChange(newValue);
	};

	return (
		<MuiAutocomplete
			value={selectedValue}
			options={options}
			getOptionLabel={(option) => option.label}
			onChange={handleChange}
			renderInput={(params) => <TextField {...params} label={label} />}
			fullWidth
			{...otherProps}
		/>
	);
};

export default DropdownProperty;
