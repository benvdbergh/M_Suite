import React, { useEffect, useRef } from "react";
import cytoscape from "cytoscape";
import { useGraph } from "../hooks/useGraph";
import { useNodeInteractions } from "../hooks/useNodeInteractions";
import { useEdgeInteractions } from "../hooks/useEdgeInteractions";

import { useTheme } from '@mui/material/styles';

const GraphCanvas = () => {
    const cyRef = useRef(null);
    const theme = useTheme();
	const { cyInstance, initializeGraph } = useGraph(cyRef);
	const { handleNodeTap } = useNodeInteractions(cyInstance);
    const { handleEdgeTap } = useEdgeInteractions(cyInstance);
    
    useEffect(() => {
        if (cyRef.current) {
            cyRef.current.style.backgroundColor = theme.palette.background.default;
        }
    }, [theme]);

	useEffect(() => {
		if (cyRef.current) {
			initializeGraph();
		}
	}, [initializeGraph]);

	useEffect(() => {
		if (cyInstance) {
			cyInstance.on("tap", "node", handleNodeTap);
			cyInstance.on("tap", "edge", handleEdgeTap);

			return () => {
				cyInstance.removeListener("tap", "node", handleNodeTap);
				cyInstance.removeListener("tap", "edge", handleEdgeTap);
			};
		}
	}, [cyInstance, handleNodeTap, handleEdgeTap]);

	return <div ref={cyRef} style={{ width: "100%", height: "100%" }} />;
};

export default GraphCanvas;
