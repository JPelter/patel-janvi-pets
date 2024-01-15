import React from 'react';
import { Paper, TextField, Button, Stack } from '@mui/material';
import axios from 'axios';

const LoginFlow = (props) => {
    console.log('LoginFlow props:', props);
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
};

export default LoginFlow;
