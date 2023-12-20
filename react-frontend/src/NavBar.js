import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { NavLink, useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChatIcon from '@mui/icons-material/Chat';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import EventIcon from '@mui/icons-material/Event';

export default function ButtonAppBar(props) {
  const location = useLocation();
  const activeLinkStyle = { backgroundColor: '#f50057' };
  const commonButtonStyle = {
    color: 'white',
    margin: '2px',
    transition: 'background-color 0.3s ease',
    '&:hover': { backgroundColor: '#f50057' }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#333' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <div>
          <IconButton component={NavLink} to="/" exact sx={{ ...commonButtonStyle, ...(location.pathname === '/' ? activeLinkStyle : {}) }}>
            <HomeIcon />
          </IconButton>
          <IconButton component={NavLink} to="/services" sx={{ ...commonButtonStyle, ...(location.pathname === '/services' ? activeLinkStyle : {}) }}>
            <MenuBookIcon />
          </IconButton>
          {props.authenticated && (
            <>
              <IconButton component={NavLink} to="/appointments" sx={{ ...commonButtonStyle, ...(location.pathname === '/appointments' ? activeLinkStyle : {}) }}>
                <EventIcon />
              </IconButton>
              <IconButton component={NavLink} to="/chat" sx={{ ...commonButtonStyle, ...(location.pathname === '/chat' ? activeLinkStyle : {}) }}>
                <ChatIcon />
              </IconButton>
            </>
          )}
        </div>
        <IconButton component={NavLink} to="/account" sx={{ ...commonButtonStyle, ...(location.pathname === '/account' ? activeLinkStyle : {}) }}>
          <AccountCircleIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
