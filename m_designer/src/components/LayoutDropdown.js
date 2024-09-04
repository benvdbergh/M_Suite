import React from 'react';
import { Select, MenuItem, Box } from '@mui/material';
import styles from './LayoutDropdown.module.css';

const LayoutDropdown = ({ layouts, onLayoutChange, onCreateNewLayout }) => {
  return (
    <Box className={styles['layout-dropdown']}>
      <Select onChange={(e) => onLayoutChange(e.target.value)} fullWidth>
        {layouts.map((layout, index) => (
          <MenuItem key={index} value={layout.layoutId}>
            {layout.layoutName}
          </MenuItem>
        ))}
        <MenuItem value="create-new">Create New Layout</MenuItem>
      </Select>
    </Box>
  );
};

export default LayoutDropdown;