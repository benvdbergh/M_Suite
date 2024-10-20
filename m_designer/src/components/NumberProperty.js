import React, { useState, useEffect } from "react";
import { TextField as MuiTextField } from "@mui/material";

const NumberProperty = ({ label, value, onBlur, ...otherProps }) => {
	const [inputValue, setInputValue] = useState(value);

	useEffect(() => {
		setInputValue(value);
	}, [value]);

	const handleBlur = () => {
		onBlur(Number(inputValue));
	};

	return (
		<MuiTextField
			label={label}
			type="number"
			value={inputValue}
			onChange={(e) => setInputValue(e.target.value)}
			onBlur={handleBlur}
			{...otherProps}
		/>
	);
};

export default NumberProperty;
