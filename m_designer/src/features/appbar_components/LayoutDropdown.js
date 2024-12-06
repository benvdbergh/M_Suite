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
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const LayoutDropdown = () => {
  const project = useSelector((state) => state.global.project);
  const metaInformation = useSelector((state) => state.global.projectMetaInformation);
  const selectedLayout = useSelector((state) => state.user.selectedLayout);
  const layouts = useSelector((state) => state.global.layouts);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('layouts from dropdown', layouts)
    if (Object.keys(layouts).length > 0 && metaInformation) {
      const projectId = metaInformation.projectIdentification;
      const layoutId = Object.keys(layouts)[0];
      dispatch(setSelectedLayoutId({ projectId, layoutId }));
    }
  }, [project]);

  const handleLayoutChange = (layoutId) => {
    if (layoutId === 'create-new') {
      // Handle creating a new layout
    } else {
      console.log('Changing to layout:', layoutId);
      const projectId = metaInformation.projectIdentification;
      const layoutId = layouts.find(layout => layout.layoutId === layoutId).layoutId;
      if (layouts[layoutId]) {
        dispatch(setSelectedLayoutId({ projectId, layoutId }));
      }
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
        {layouts.map((layout, index) => (
          <MenuItem key={index} value={layout?.layoutId}>
            {layout?.layoutName}
          </MenuItem>
        ))}
      </Select>
    </LayoutDropdownContainer>
  );
};

export default LayoutDropdown;