import React from 'react';
import { styled } from '@mui/system';
import Button from '@mui/material/Button';

import mapTemplate from '../../interfaces/map.json'; // Import the map template

const ExportButtonContainer = styled(Button)({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '20px',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  textAlign: 'center',
  padding: '10px 20px',
  '&:hover': {
    backgroundColor: '#45a049',
  },
});


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
        <ExportButtonContainer onClick={handleExport} title='export-map'>
            Export LIF
        </ExportButtonContainer>
    );
};

export default ExportButton;