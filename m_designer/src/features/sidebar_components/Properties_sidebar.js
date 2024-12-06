import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { styled } from '@mui/system';
import { Box, } from '@mui/material';
import { updateElement } from '../../state/reducers/globalReducer'; // Import the updateElement action
import EdgePropertiesCard from './EdgeProperties_card';
import NodePropertiesCard from './NodeProperties_card';

const PropertiesSidebarContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
}));

const PropertiesSidebar = () => {
  const dispatch = useDispatch();
  const selectedElementId = useSelector((state) => state.user.selectedElement.elementId);
  const selectedElementType = useSelector((state) => state.user.selectedElement.elementType);

  const layouts = useSelector((state) => state.global.layouts);
  const layoutId = useSelector((state) => state.user.selectedLayoutId);
  const nodes = useSelector((state) => state.global.nodes);
  const edges = useSelector((state) => state.global.edges);

  const selectedElement = nodes[selectedElementId] || edges[selectedElementId];

  const handleElementUpdate = (id, newData) => {
    console.trace('Element updated: ', id, newData);
    dispatch(updateElement({ layoutId, elementId: id, newData })); // Dispatch the updateElement action
  };

  return (
    <PropertiesSidebarContainer>
      {selectedElement ? (
        selectedElementType === 'edge' ? (
          <EdgePropertiesCard
            selectedElement={selectedElement}
            updateElement={handleElementUpdate}
          />
        ) : selectedElementType === 'node' ? (
          <NodePropertiesCard
            selectedElement={selectedElement}
            updateElement={handleElementUpdate}
          />
        ) : null
      ) : (
        "No element selected"
      )}
    </PropertiesSidebarContainer>
  );
};

export default PropertiesSidebar;