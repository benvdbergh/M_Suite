import React from 'react';
import styles from './ExportButton.module.css';

const ExportButton = ({ mapData }) => {
    const handleExport = (event) => {
        event.stopPropagation();
        const json = JSON.stringify(mapData, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'map.json';
        a.click();
        URL.revokeObjectURL(url);
    };

    return <button onClick={handleExport} className={styles.exportButton} title='export-map'>Export JSON</button>;
};

export default ExportButton;