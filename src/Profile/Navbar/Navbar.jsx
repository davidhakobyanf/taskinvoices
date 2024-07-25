import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

const Navbar = ({ name }) => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('Name');
        localStorage.removeItem('UserId');
        navigate('/taskinvoices');
    };
    return (
        <AppBar position="fixed">
            <Toolbar style={{ justifyContent: 'end' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body1" component="div" sx={{ mr: 2 }}>
                        Name: {name}
                    </Typography>
                    <IconButton color="inherit" onClick={handleLogout}>
                        <IoLogOutOutline style={{ fontSize: '24px' }} />
                    </IconButton>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
