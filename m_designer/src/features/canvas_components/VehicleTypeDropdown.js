import { React, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Select, MenuItem } from '@mui/material';
import { setSelectedLayoutId } from '../../state/reducers/userReducer';
import { styled } from '@mui/system';
import { Box } from '@mui/material';

const VehicleTypeDropdownContainer = styled(Box)(({ theme }) => ({
    position: 'absolute',
    bottom: theme.spacing(1),
    left: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
  }));

const VehicleTypeDropdown = () => {
    const [selectedVehicleType, setSelectedVehicleType] = useState(null);
    

    const layouts = useSelector((state) => state.global.layouts);
    const metaInformation = useSelector((state) => state.global.projectMetaInformation);
    const selectedLayoutId = useSelector((state) => state.user.selectedLayoutId);
    const dispatch = useDispatch();
    var layout;
    

    useEffect(() => {
        if (Object.keys(layouts).length > 0) {
            layout = layouts[selectedLayoutId];
            console.log(layout)    
        }
    }, [layouts, selectedLayoutId]);

    const handleVehicleTypeChange = (vehicleTypeId) => {
        
        const projectId = metaInformation.projectIdentification;
        dispatch(setSelectedVehicleType({ projectId, layoutId: selectedLayoutId, vehicleTypeId }));
        
    };

    const getVehicleTypes = () => {
        const vehicleTypes = [];
        if (layout) {
            layout.nodes.forEach(node => {
                if (node.vehicleTypeNodeProperties) {
                    node.vehicleTypeNodeProperties.forEach(vehicleType => {
                        vehicleTypes.push(vehicleType.vehicleTypeId);
                    });
                }
            });

            layout.edges.forEach(edge => {
                if (edge.vehicleTypeEdgeProperties) {
                    edge.vehicleTypeEdgeProperties.forEach(vehicleType => {
                        vehicleTypes.push(vehicleType.vehicleTypeId);
                    });
                }
            });
        }
        // console.assert(layout, 'Layout is null');

        return vehicleTypes;
    };

    if (!layouts) {
        return null;
    }


    return (
        <VehicleTypeDropdownContainer>
            <Select
                onChange={(e) => handleVehicleTypeChange(e.target.value)}
                fullWidth
                value={selectedVehicleType ? selectedVehicleType : ''}
                size='small'
            >
                {getVehicleTypes().map((vehicleType, index) => (
                    <MenuItem key={index} value={vehicleType}>
                        {vehicleType}
                    </MenuItem>
                ))}
            </Select>
        </VehicleTypeDropdownContainer>
    );
};

export default VehicleTypeDropdown;