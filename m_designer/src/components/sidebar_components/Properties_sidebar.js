import NodeProperties from './NodeProperties_card';
import EdgeProperties from './EdgeProperties_card';
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
  const isEdge = selectedElement?.isEdge();
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
        "No node selected"
      )}

      {selectedElement ? (
        isEdge && (
          <EdgeProperties
            selectedElement={elementData}
            updateElement={updateElement}
            mapData={mapData}
          />
        )
      ) : (
        "No edge selected"
      )}
      <ExportButton mapData={mapData} />
    </PropertiesSidebarContainer>
  );
};

export default PropertiesSidebar;