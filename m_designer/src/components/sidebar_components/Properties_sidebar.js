import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ElementProperties from './ElementProperties';
import { styled } from '@mui/system';
import { Box, Typography  } from '@mui/material';
import { updateElement } from '../../state/reducers/globalReducer'; // Import the updateElement action
import { useEffect, useState } from 'react';
import VehicleTypeNodePropertyCard from './VehicleTypeNodeProperty_card'; // Import the new component

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
  const [vehicleTypeNodeProperties, setVehicleTypeNodeProperties] = useState([]);


  const selectedElement = project.layouts
    .flatMap(layout => layout.nodes.concat(layout.edges))
    .find(element => element.nodeId === selectedElementId || element.edgeId === selectedElementId);

  const handleElementUpdate = (id, newData) => {
    console.trace('Element updated: ', id, newData);
    dispatch(updateElement({ layoutId, elementId: id, newData })); // Dispatch the updateElement action
  };

  

  useEffect(() => {
    if (selectedElement) {
      setVehicleTypeNodeProperties(selectedElement.vehicleTypeNodeProperties || []);
    }
  }, [selectedElement]);

  return (
    <PropertiesSidebarContainer>
    {selectedElementType ? (
      <ElementProperties
        element={selectedElement}
        updateElement={handleElementUpdate}
      />
    ) : (
      "No element selected"
    )}
  </PropertiesSidebarContainer>
  );
};

export default PropertiesSidebar;