import React from 'react';
import axios from 'axios';

import {Button} from '@mui/material';

const Profile = (props) => {
    console.log('Profile props:', props);
    const handleLogout = async () => {
        try {
          // Make your axios API call for logout here
          const response = await axios.get(`${process.env.REACT_APP_API_LOGOUT}`);
          console.log('Logout API call:', response.data);
          props.setAuthenticated(false);
        } catch (error) {
          console.error('Error logging out:', error);
          // TODO: delete cookie with client manually?
        }
      };
    
      return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: '1', overflow: 'auto' }}>
            <p>Welcome to your profile page!</p>
          </div>
          <div style={{ marginTop: '50px', textAlign: 'center' }}>
            <Button onClick={handleLogout} variant="contained">
              Logout
            </Button>
          </div>
        </div>
      );
};

export default Profile;
