import React from 'react';
import axios from 'axios';

import { Paper, TextField, Button, Stack } from '@mui/material';


axios.defaults.withCredentials = true;

function UnauthenticatedComponent(props) {
    const [email, setEmail] = React.useState('');
    const [token, setToken] = React.useState('');
    const [emailSubmitted, setEmailSubmitted] = React.useState(false);
    const [tokenSubmitted, setTokenSubmitted] = React.useState(false);

    const handleSubmitEmail = async (e) => {
        setEmailSubmitted(true);
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_TOKEN_EMAIL}`, {
                email: email
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('Token email request sent:', response.data);
        } catch (error) {
            console.error('Error sending token email request:', error);
        }
    };

    const handleSubmitToken = async (e) => {
        setTokenSubmitted(true);
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_TOKEN_EXCHANGE}`, {
                email: email,
                login_token: token
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('Token exchanged for session cookie:', response.data);
            props.setAuthenticated(true);
        } catch (error) {
            console.error('Error exchanging token for session cookie:', error);
        }
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <Paper elevation={3} style={{ padding: '20px', margin: '20px'}} component={Stack} direction="column" justifyContent="center">
                {!emailSubmitted && (
                    <form onSubmit={handleSubmitEmail}>
                        <TextField
                            type="email"
                            label="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                        />
                        <Button type="submit" variant="contained" color="primary">
                            Request login token!
                        </Button>
                    </form>
                )}

                {emailSubmitted && !tokenSubmitted && (
                    <form onSubmit={handleSubmitToken}>
                        <TextField
                            type="text"
                            label="Enter token from email"
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                        />
                        <Button type="submit" variant="contained" color="primary">
                            Login with token!
                        </Button>
                    </form>
                )}

                {tokenSubmitted && !props.authenticated && (
                    <div>
                        <p>Try refreshing if something went wrong...</p>
                    </div>
                )}
            </Paper>
        </div>
    );
}

function AdminComponent() {
    return (
        <div style={{ marginTop: '50px', textAlign: 'center' }}>
            <p>You are an admin!</p>
        </div>
      );
}

function AuthenticatedComponent(props) {
    console.log(props.admin)
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
          {/* Display authenticated user's profile information */}
        </div>
        <div style={{ marginTop: '50px', textAlign: 'center' }}>
          {/* MUI Button for Logout */}
          <Button onClick={handleLogout} variant="contained">
            Logout
          </Button>
        </div>
        {props.admin && (
            <AdminComponent/>
        )}
      </div>
    );
  }

function Account(props) {
    const { authenticated, setAuthenticated, admin } = props;

    return (
        <>
            {authenticated ? <AuthenticatedComponent authenticated={authenticated} setAuthenticated={setAuthenticated} admin={admin} /> : <UnauthenticatedComponent authenticated={authenticated} setAuthenticated={setAuthenticated} />}
        </>
    );
}

export default Account;