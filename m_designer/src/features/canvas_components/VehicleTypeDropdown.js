import { React, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Select, MenuItem } from '@mui/material';
import { setSelectedLayoutId } from '../../state/reducers/userReducer';

const VehicleTypeDropdown = () => {
    const [selectedVehicleType, setSelectedVehicleType] = useState(null);
    

    const project = useSelector((state) => state.global.project);
    const selectedLayoutId = useSelector((state) => state.user.selectedLayoutId);
    const dispatch = useDispatch();
    var layout;
    

    useEffect(() => {
        if (project && project.layouts.length > 0) {
            const projectId = project.metaInformation.projectIdentification;
            layout = project.layouts.find(layout => layout.layoutId === selectedLayoutId).layoutId;

            
        }
    }, [project]);

    const handleVehicleTypeChange = (vehicleTypeId) => {
        
        const projectId = project.metaInformation.projectIdentification;
        dispatch(setSelectedVehicleType({ projectId, layoutId: selectedLayoutId, vehicleTypeId }));
        
    };

    const getVehicleTypes = () => {
        const vehicleTypes = [];
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

        return vehicleTypes;
    };

    if (!project || !project.layouts) {
        return null;
    }


    return (
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
    );
};

export default VehicleTypeDropdown;