import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppBar, Toolbar, IconButton, Typography, Box, Button, Menu, MenuItem } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';

import { setNewProject } from '../../state/reducers/globalReducer';
import { setSelectedElement } from '../../state/reducers/userReducer';

import LayoutDropdown from './LayoutDropdown';
import SearchBar from './SearchBar';
import ConfirmDialog from '../util_components/ConfirmDialog';


const AppBarComponent = () => {
  const project = useSelector((state) => state.global.project);
  const [anchorEl, setAnchorEl] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const dispatch = useDispatch();

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

    handleMenuClose();
  };

  const handleNewProject = () => {
    setDialogOpen(true);
  };

  const handleConfirmNewProject = () => {
    dispatch(setNewProject());
    dispatch(setSelectedElement({ projectId: null, layoutId: null, elementType: null, elementId: null })); 
    setDialogOpen(false);
    handleMenuClose();
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    handleMenuClose();
  };


  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ mr: 2 }}>
          Logo
        </Typography>
        <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 2 }}>
          <Button color="inherit" onClick={handleMenuOpen}>Project</Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleExport}>Export</MenuItem>
            <MenuItem onClick={handleNewProject}>New Project</MenuItem>
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
      <ConfirmDialog
        open={dialogOpen}
        message="Are you sure you want to start a new project? Unsaved changes will be lost."
        handleConfirm={handleConfirmNewProject}
        handleClose={handleCloseDialog}
        handleNo={handleCloseDialog}
      />
    </AppBar>
  );
};

export default AppBarComponent;
