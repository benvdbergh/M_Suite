import { useState, useCallback } from "react";
import cytoscape from "cytoscape";

import { useTheme } from "@mui/material/styles";

export const cytoscapeStyles = [
	{
		selector: "node",
		style: {
			"background-color": "#666",
			label: "data(label)",
			width: 20,
			height: 20,
			shape: "ellipse",
		},
	},
	{
		selector: "edge",
		style: {
			width: 5,
			"line-color": "#ccc",
			"curve-style": "bezier",
			"control-point-step-size": 40,
			"target-arrow-shape": "data(targetArrowShape)",
			"source-arrow-shape": "data(sourceArrowShape)",
		},
	},
	{
		selector: ".selected",
	},
];

export const useGraph = (cyRef) => {
    const [cyInstance, setCyInstance] = useState(null);
    const theme = useTheme();

	const initializeGraph = useCallback(() => {
		const cy = cytoscape({
			container: cyRef.current,
			elements: [], // Initial elements
			style:  [
					...cytoscapeStyles,
					{
						selector: "node",
						style: {
							"background-color": theme.palette.primary.main,
							color: theme.palette.text.primary,
						},
					},
					{
						selector: "edge",
						style: {
							"line-color": theme.palette.divider,
						},
					},
				],
			layout: { name: "preset" },
		});
		setCyInstance(cy);
	}, [cyRef]);

	return { cyInstance, initializeGraph };
};
