import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { Link } from 'react-router-dom';

export default function ButtonAppBar({Authenticated, setAuthenticated}) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Link to="/">
            <Typography variant="h6" component="div">
                Home
            </Typography>
          </Link>
          <Link to="/services">
            <Typography variant="h6" component="div">
                Services
            </Typography>
          </Link>
          {Authenticated && (
            <>
              <Link to="/appointments">
                  <Typography variant="h6" component="div">
                      Appointments
                  </Typography>
              </Link>
              <Link to="/chat">
                  <Typography variant="h6" component="div">
                      Chat
                  </Typography>
              </Link>
            </>
          )}
          <div sx={{ flexGrow: 1 }}></div>
          <Link to="/account">
            <Typography variant="h6" component="div">
                Account
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}