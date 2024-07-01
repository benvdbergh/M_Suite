import React from 'react';
import { addMetaData } from '../utils/LIF-Cytoscape';

const ExportButton = ({ mapData }) => {
    const handleExport = (event) => {
        event.stopPropagation();
        console.log(mapData)
        const lifData = addMetaData(mapData)    
        const json = JSON.stringify(lifData, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'map.json';
        a.click();
        URL.revokeObjectURL(url);
    };

    return <button onClick={handleExport} title='export-map'>Export JSON</button>;
};

export default ExportButton;