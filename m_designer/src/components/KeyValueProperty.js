import React, { useState, useEffect } from "react";
import { TextField, Box, IconButton } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const KeyValueProperty = ({ labels, pair, onChange, onRemove, ...otherProps }) => {
	const [key, setKey] = useState(pair.key);
	const [value, setValue] = useState(pair.value);

	useEffect(() => {
		setKey(pair.key);
		setValue(pair.value);
	}, [pair]);

	const handleKeyChange = (e) => {
		setKey(e.target.value);
		onChange({ key: e.target.value, value });
	};

	const handleValueChange = (e) => {
		setValue(e.target.value);
		onChange({ key, value: e.target.value });
	};

	return (
		<Box display="flex" alignItems="center" mb={1} {...otherProps}>
			<TextField
				label={labels.key}
				value={key}
				onChange={handleKeyChange}
				fullWidth
				margin="normal"
			/>
			<TextField
				label={labels.value}
				value={value}
				onChange={handleValueChange}
				fullWidth
				margin="normal"
			/>
			<IconButton onClick={onRemove} color="secondary">
				<RemoveCircleOutlineIcon />
			</IconButton>
		</Box>
	);
};

export default KeyValueProperty;
