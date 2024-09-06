import React from 'react';
import { Select, MenuItem, Box } from '@mui/material';
import { styled, alpha } from '@mui/system';

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

  const handleLayoutChange = (layoutId) => {
    if (layoutId === 'create-new') {
      // Handle creating a new layout
    } else {
      // Handle changing to an existing layout
    }
  };

  return (
    <LayoutDropdownContainer>
      <Select
        onChange={(e) => handleLayoutChange(e.target.value)}
        fullWidth
        defaultValue=""
        size='small'
      >
        {/* {layouts.map((layout, index) => (
          <MenuItem key={index} value={layout.layoutId}>
            {layout.layoutName}
          </MenuItem>
        ))} */}
        <MenuItem value="create-new">Create New Layout</MenuItem>
      </Select>
    </LayoutDropdownContainer>
  );
};

export default LayoutDropdown;