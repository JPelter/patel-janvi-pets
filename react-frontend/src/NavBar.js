import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { NavLink, useLocation } from 'react-router-dom';

export default function ButtonAppBar(props) {
  const location = useLocation();

  const activeLinkStyle = {
    color: 'white',
    backgroundColor: '#f50057',
    '&:hover': {
      backgroundColor: '#ff4081',
    },
  };

  const commonButtonStyle = {
    color: 'white',
    marginRight: '20px',
    '&:hover': {
      backgroundColor: '#555',
    },
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#333' }}>
      <Toolbar>
        <Button
          component={NavLink}
          to="/"
          exact
          activeClassName="active"
          sx={{
            ...commonButtonStyle,
            ...(location.pathname === '/' ? activeLinkStyle : {}),
          }}
        >
          HOME
        </Button>
        <Button
          component={NavLink}
          to="/services"
          activeClassName="active"
          sx={{
            ...commonButtonStyle,
            ...(location.pathname === '/services' ? activeLinkStyle : {}),
          }}
        >
          SERVICES
        </Button>
        {props.authenticated && (
          <>
            <Button
              component={NavLink}
              to="/appointments"
              activeClassName="active"
              sx={{
                ...commonButtonStyle,
                ...(location.pathname === '/appointments'
                  ? activeLinkStyle
                  : {}),
              }}
            >
              APPOINTMENTS
            </Button>
            <Button
              component={NavLink}
              to="/chat"
              activeClassName="active"
              sx={{
                ...commonButtonStyle,
                ...(location.pathname === '/chat' ? activeLinkStyle : {}),
              }}
            >
              CHAT
            </Button>
          </>
        )}
        <Button
          component={NavLink}
          to="/account"
          activeClassName="active"
          sx={{
            ...commonButtonStyle,
            ...(location.pathname === '/account' ? activeLinkStyle : {}),
          }}
        >
          ACCOUNT
        </Button>
      </Toolbar>
    </AppBar>
  );
}
