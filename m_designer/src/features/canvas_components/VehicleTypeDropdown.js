import { React, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Select, MenuItem } from '@mui/material';
import { setSelectedVehicleTypeId } from '../../state/reducers/userReducer';
import { styled } from '@mui/system';
import { Box } from '@mui/material';

const VehicleTypeDropdownContainer = styled(Box)(({ theme }) => ({
    position: 'absolute',
    bottom: theme.spacing(1),
    left: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    zIndex: 10,
}));
  
const ThemedSelect = styled(Select)(({ theme }) => ({
	backgroundColor: theme.palette.background.paper, // Use theme's background color
	borderRadius: theme.shape.borderRadius, // Use theme's border radius
	boxShadow: theme.shadows[1], // Use theme's shadow for a subtle effect
	"&:hover": {
		backgroundColor: theme.palette.action.hover, // Change background on hover
	},
}));

const VehicleTypeDropdown = () => {   

    const layouts = useSelector((state) => state.global.layouts);
    const nodes = useSelector((state) => state.global.nodes);
    const edges = useSelector((state) => state.global.edges);
    const metaInformation = useSelector((state) => state.global.projectMetaInformation);
    const selectedLayoutId = useSelector((state) => state.user.selectedLayoutId);
    const selectedVehicleTypeId = useSelector((state) => state.user.selectedVehicleTypeId);
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
        dispatch(setSelectedVehicleTypeId({ projectId, layoutId: selectedLayoutId, vehicleTypeId }));
        
    };

    const getVehicleTypes = () => {
        const vehicleTypes = [];
        Object.values(nodes).forEach(node => {
            if (node.vehicleTypeNodeProperties) {
                node.vehicleTypeNodeProperties.forEach(vehicleType => {
                    vehicleTypes.push(vehicleType.vehicleTypeId);
                });
            }
        });
        Object.values(edges).forEach(edge => {
            if (edge.vehicleTypeEdgeProperties) {
                edge.vehicleTypeEdgeProperties.forEach(vehicleType => {
                    vehicleTypes.push(vehicleType.vehicleTypeId);
                });
            }
        });

        const defaultTypes = ['DIFF', 'OMNI', 'THREEWHEEL'];

        if (vehicleTypes.length === 0) {
            return defaultTypes;

        }

        return vehicleTypes;
    };

    return (
			<VehicleTypeDropdownContainer>
				<ThemedSelect
					onChange={(e) => handleVehicleTypeChange(e.target.value)}
					fullWidth
					value={selectedVehicleTypeId}
					size="small"
				>
					{getVehicleTypes().map((vehicleType) => (
						<MenuItem key={vehicleType} value={vehicleType}>
							{vehicleType}
						</MenuItem>
					))}
				</ThemedSelect>
			</VehicleTypeDropdownContainer>
		);
};

export default VehicleTypeDropdown;