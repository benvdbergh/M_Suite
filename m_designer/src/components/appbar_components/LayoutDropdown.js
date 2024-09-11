import { React, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Select, MenuItem } from '@mui/material';
import { styled, alpha } from '@mui/system';
import { setSelectedLayoutId } from '../../state/reducers/userReducer';

const LayoutDropdownContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const LayoutDropdown = () => {
  const project = useSelector((state) => state.global.project);
  const selectedLayout = useSelector((state) => state.user.selectedLayout);
  const dispatch = useDispatch();

  useEffect(() => {
    if (project && project.layouts.length > 0) {
      const projectId = project.metaInformation.projectIdentification;
      const layoutId = project.layouts[0].layoutId;
      dispatch(setSelectedLayoutId({ projectId, layoutId }));
    }
  }, [project]);

  const handleLayoutChange = (layoutId) => {
    if (layoutId === 'create-new') {
      // Handle creating a new layout
    } else {
      console.log('Changing to layout:', layoutId);
      const projectId = project.metaInformation.projectIdentification;
      const layoutId = project.layouts.find(layout => layout.layoutId === layoutId).layoutId;
      dispatch(setSelectedLayoutId({ projectId, layoutId }));
    }
  };

  if (!project || !project.layouts) {
    return null;
  }

  return (
    <LayoutDropdownContainer>
      <Select
        onChange={(e) => handleLayoutChange(e.target.value)}
        fullWidth
        value={selectedLayout ? selectedLayout.layoutId : (project.layouts.length > 0 ? project.layouts[0].layoutId : '')}
        size='small'
      >
        {project.layouts.map((layout, index) => (
          <MenuItem key={index} value={layout?.layoutId}>
            {layout?.layoutName}
          </MenuItem>
        ))}
        <MenuItem value="create-new">Create New Layout</MenuItem>
      </Select>
    </LayoutDropdownContainer>
  );
};

export default LayoutDropdown;