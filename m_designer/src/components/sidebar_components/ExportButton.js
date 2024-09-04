import React from 'react';
import styles from './ExportButton.module.css';
import mapTemplate from '../../interfaces/map.json'; // Import the map template

const ExportButton = ({ mapData }) => {
    const handleExport = (event) => {
        event.stopPropagation();

        // Use the map template and insert notes in edgeDescription
        const lifData = {
            ...mapTemplate,
            layouts: mapTemplate.layouts.map(layout => ({
                ...layout,
                nodes: mapData.layouts[0].nodes,
                edges: mapData.layouts[0].edges
            }))
        };

        // Convert the LIF data to a string
        const lifString = JSON.stringify(lifData, null, 2);

        // Create a Blob with the LIF data
        const blob = new Blob([lifString], { type: 'application/json' });

        // Create a URL for the Blob
        const url = URL.createObjectURL(blob);

        // Create a temporary anchor element to trigger the download
        const a = document.createElement('a');
        a.href = url;
        a.download = 'map.json';
        a.click();

        // Revoke the URL to free up resources
        URL.revokeObjectURL(url);
    };

    return (
        <button onClick={handleExport} className={styles.exportButton} title='export-map'>
            Export LIF
        </button>
    );
};

export default ExportButton;