import React from 'react';
import axios from 'axios';
import { Paper, TextField, Button } from '@mui/material';

function UnauthenticatedComponent() {
    const [email, setEmail] = React.useState('');
    const [token, setToken] = React.useState('');
    const [emailSubmitted, setEmailSubmitted] = React.useState(false);

    const handleSubmitEmail = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(process.env.REACT_APP_API_TOKEN, {
                headers: {
                    'Content-Type': 'application/json'
                },
                params: { email } // Send email as a query parameter
            });
            console.log('Token email request sent:', response.data);
        } catch (error) {
            console.error('Error sending token email request:', error);
        }
        setEmailSubmitted(true); // Show token input after email submission
    };

    const handleSubmitToken = async (e) => {
        e.preventDefault();
        fetch(`${process.env.REACT_APP_API_TOKEN}`, {
            method: 'POST',
            body: JSON.stringify({ token }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log('Session obtained:', data);
            // Handle the response accordingly
        })
        .catch(error => {
            console.error('Error obtaining session:', error);
        });
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <Paper elevation={3} style={{ padding: '20px', margin: '20px', maxWidth: '300px'}}>
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
                        Request New Token!
                    </Button>
                </form>

                {emailSubmitted && (
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
                            Submit Login Token!
                        </Button>
                    </form>
                )}
            </Paper>
        </div>
    );
}

function AuthenticatedComponent() {
    // Component for authenticated user - Profile Page
    return (
        <div>
            <p>Welcome to your profile page!</p>
            {/* Display authenticated user's profile information */}
        </div>
    );
}

function ACCOUNT(props) {
    const { authenticated } = props;

    const componentStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Adjust this value based on your layout
    };

    return (
        <div style={componentStyle}>
            {authenticated ? <AuthenticatedComponent /> : <UnauthenticatedComponent />}
        </div>
    );
}

export default ACCOUNT;