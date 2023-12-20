import React from 'react';
import AppBar from '@mui/material/AppBar';

import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';

import './NavBar.css';

export default function ButtonAppBar(props) {
  
  return (
    <AppBar position="static" style={{ backgroundColor: '#333' }}>
      <Toolbar>
        <Button component={NavLink} to="/" exact style={{ marginRight: '10px' }} variant="contained" color="primary" activeClassName="active">
          HOME
        </Button>
        <Button component={NavLink} to="/services" style={{ marginRight: '10px' }} variant="contained" color="primary" activeClassName="active">
          SERVICES
        </Button>
        {props.authenticated && (
          <>
            <Button component={NavLink} to="/appointments" style={{ marginRight: '10px' }} variant="contained" color="primary" activeClassName="active">
              APPOINTMENTS
            </Button>
            <Button component={NavLink} to="/chat" style={{ marginRight: '10px' }} variant="contained" color="primary" activeClassName="active">
              CHAT
            </Button>
          </>
        )}
        <Button component={NavLink} to="/account" variant="contained" color="primary" activeClassName="active">
          ACCOUNT
        </Button>
      </Toolbar>
    </AppBar>
  );
}
