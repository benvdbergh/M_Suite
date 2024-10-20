import React, { useState, useEffect } from "react";
import { TextField as MuiTextField } from "@mui/material";

const TextProperty = ({ label, value, ...otherProps }) => {
	const [inputValue, setInputValue] = useState(value);

	useEffect(() => {
		setInputValue(value);
	}, [value]);

	return (
		<MuiTextField
			label={label}
			value={inputValue}
			onChange={(e) => setInputValue(e.target.value)}
			fullWidth
			margin="normal"
			{...otherProps}
		/>
	);
};

export default TextProperty;
