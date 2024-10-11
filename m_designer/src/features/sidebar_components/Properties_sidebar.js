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
  const project = useSelector((state) => state.global.project);
  const layoutId = useSelector((state) => state.user.selectedLayoutId);


  const selectedElement = project.layouts
    .flatMap(layout => layout.nodes.concat(layout.edges))
    .find(element => element.nodeId === selectedElementId || element.edgeId === selectedElementId);

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
            project={project}
          />
        ) : selectedElementType === 'node' ? (
          <NodePropertiesCard
            selectedElement={selectedElement}
            updateElement={handleElementUpdate}
            project={project}
          />
        ) : null
      ) : (
        "No element selected"
      )}
    </PropertiesSidebarContainer>
  );
};

export default PropertiesSidebar;