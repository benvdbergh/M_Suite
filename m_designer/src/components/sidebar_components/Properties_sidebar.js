import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import NodeProperties from './NodeProperties_card';
import EdgeProperties from './EdgeProperties_card';
import { styled } from '@mui/system';
import { Box } from '@mui/material';
import { updateElement } from '../../state/reducers/globalReducer'; // Import the updateElement action

const PropertiesSidebarContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100%',
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
      {selectedElementType ? (
        selectedElementType === 'node' ? (
          <NodeProperties
            selectedElement={selectedElement}
            updateElement={handleElementUpdate}
          />
        ) : (
          <EdgeProperties
            selectedElement={selectedElement}
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