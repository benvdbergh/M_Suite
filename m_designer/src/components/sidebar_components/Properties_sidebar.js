import React from 'react';
import { useSelector } from 'react-redux';
import NodeProperties from './NodeProperties_card';
import EdgeProperties from './EdgeProperties_card';
import { styled } from '@mui/system';
import { Box } from '@mui/material';

const PropertiesSidebarContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100%',
}));

const PropertiesSidebar = () => {
  const selectedElement = useSelector((state) => state.user.selectedElementId);
  const project = useSelector((state) => state.global.project);

  const handleElementUpdate = (id, newData) => {
    // dispatch(updateElement({ id, newData }));
  };

  return (
    <PropertiesSidebarContainer>
      {selectedElement ? (
        selectedElement.isNode() ? (
          <NodeProperties
            selectedElement={selectedElement.data()}
            updateElement={handleElementUpdate}
          />
        ) : (
          <EdgeProperties
            selectedElement={selectedElement.data()}
            updateElement={handleElementUpdate}
            project={project}
          />
        )
      ) : (
        "No element selected"
      )}
    </PropertiesSidebarContainer>
  );
};

export default PropertiesSidebar;