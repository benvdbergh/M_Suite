import React from 'react';
import { useSelector } from 'react-redux';
import { Select, MenuItem } from '@mui/material';
import { styled, alpha } from '@mui/system';
import { useLayout } from '../../contexts/LayoutContext';

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
  const project = useSelector((state) => state.lif.project);
  const { selectedLayout, setSelectedLayout } = useLayout();

  const handleLayoutChange = (layoutId) => {
    if (layoutId === 'create-new') {
      // Handle creating a new layout
    } else {
      console.log('Changing to layout:', layoutId);
      setSelectedLayout(project.layouts.find(layout => layout.layoutId === layoutId));
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
        value={selectedLayout ? selectedLayout.layoutId : ''}
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