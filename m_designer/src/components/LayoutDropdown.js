import React from 'react';
import { Select, MenuItem, Box } from '@mui/material';
import { styled } from '@mui/system';

const LayoutDropdownContainer = styled(Box)({
  position: 'absolute',
  top: '10px',
  left: '10px',
  zIndex: 1000,
});

const LayoutDropdown = ({ layouts, onLayoutChange, onCreateNewLayout }) => {
  return (
    <LayoutDropdownContainer>
      <Select
        onChange={(e) => onLayoutChange(e.target.value)}
        fullWidth
        defaultValue={layouts.length > 0 ? layouts[0].layoutId : ''}
      >
        {layouts.map((layout, index) => (
          <MenuItem key={index} value={layout.layoutId}>
            {layout.layoutName}
          </MenuItem>
        ))}
        <MenuItem value="create-new">Create New Layout</MenuItem>
      </Select>
    </LayoutDropdownContainer>
  );
};

export default LayoutDropdown;