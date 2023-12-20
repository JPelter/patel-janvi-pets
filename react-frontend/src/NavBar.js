import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import { Link } from 'react-router-dom';

export default function ButtonAppBar({Authenticated, setAuthenticated}) {
  return (
      <AppBar position="static">
        <Toolbar>
          <Link to="/">
            HOME
          </Link>
          <Link to="/services">
            SERVICES
          </Link>
          {Authenticated && (
            <>
              <Link to="/appointments">
                APPOINTMENTS
              </Link>
              <Link to="/chat">
                CHAT
              </Link>
            </>
          )}
          <Link to="/account">
            ACCOUNT
          </Link>
        </Toolbar>
      </AppBar>
  );
}