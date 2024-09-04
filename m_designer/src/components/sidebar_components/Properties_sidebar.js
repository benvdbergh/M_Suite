import NodeProperties from './NodeProperties_card';
import ExportButton from './ExportButton';

import { styled } from '@mui/system';
import { Box } from '@mui/material';

const PropertiesSidebarContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100%',
}));

const PropertiesSidebar = ({ selectedElement, updateElement, mapData }) => {
  const isNode = selectedElement?.isNode();
  const elementData = selectedElement?.data();

  return (
    <PropertiesSidebarContainer>
      {selectedElement ? (
        isNode && (
          <NodeProperties
            selectedElement={elementData}
            updateElement={updateElement}
          />
        )
      ) : (
        "No element selected"
      )}
      <ExportButton mapData={mapData} />
    </PropertiesSidebarContainer>
  );
};

export default PropertiesSidebar;