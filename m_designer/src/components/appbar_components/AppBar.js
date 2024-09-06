import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { AppBar, Toolbar, IconButton, Typography, Box, Button, Menu, MenuItem } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';

import LayoutDropdown from './LayoutDropdown';
import SearchBar from './SearchBar';


const AppBarComponent = () => {
  const project = useSelector((state) => state.lif.project);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleExport = (event) => {
    const lifData = project;
    // Convert the LIF data to a string
    const lifString = JSON.stringify(lifData, null, 2);

    // Create a Blob with the LIF data
    const blob = new Blob([lifString], { type: 'application/json' });

    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create a temporary anchor element to trigger the download
    const a = document.createElement('a');
    a.href = url;
    a.download = 'map.json';
    a.click();

    // Revoke the URL to free up resources
    URL.revokeObjectURL(url);
};

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ mr: 2 }}>
          Logo
        </Typography>
        <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 2 }}>
          <Button color="inherit" onClick={handleMenuOpen}>File</Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleExport}></MenuItem>
          </Menu>
          <Button color="inherit">View</Button>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <LayoutDropdown />
        <SearchBar />
        <IconButton edge="end" color="inherit">
          <AccountCircle />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarComponent;
