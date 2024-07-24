import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import { IoLogOutOutline } from "react-icons/io5";

const Navbar = ({ name }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const menuItems = [
        {
            key: '1',
            label: 'Home',
        },
        {
            key: '2',
            label: 'About',
        },
        {
            key: '3',
            label: 'Contact',
        },
    ];

    return (
        <AppBar position="fixed">
            <Toolbar style={{ justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={handleMenuClick}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleMenuClose}
                    >
                        {menuItems.map((item) => (
                            <MenuItem key={item.key} onClick={handleMenuClose}>
                                <Typography textAlign="center">{item.label}</Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body1" component="div" sx={{ mr: 2 }}>
                        Name: {name}
                    </Typography>
                    <IconButton color="inherit">
                        <IoLogOutOutline style={{ fontSize: '24px' }} />
                    </IconButton>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
