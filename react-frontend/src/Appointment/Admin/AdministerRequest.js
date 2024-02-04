import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import axios from 'axios';

const AdministerRequest = (props) => {
    console.log('AdministerRequest props:', props);

    const handleAccept = (requestUuid) => {
        // Make API call to accept the appointment request
        console.log('Accepting request with ID:', requestUuid);

        axios.post(`${process.env.REACT_APP_API_REQUEST_ADMIN}`, { appt_req_uuid: requestUuid, request_accepted: true })
            .then(response => {
                // Handle the response
                console.log('API response:', response.data);
            })
            .catch(error => {
                // Handle the error
                console.error('API error:', error);
            });
    };

    const handleReject = (requestUuid) => {
        // Make API call to reject the appointment request
        console.log('Rejecting request with ID:', requestUuid);
        axios.post(`${process.env.REACT_APP_API_REQUEST_ADMIN}`, { appt_req_uuid: requestUuid, request_accepted: false })
            .then(response => {
                // Handle the response
                console.log('API response:', response.data);
            })
            .catch(error => {
                // Handle the error
                console.error('API error:', error);
            });
    };

    return (
        <div>
            {props.adminRequests.map((request) => (
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h5" component="div">
                            {request.service_requested}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Target Time: {request.target_time}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Email: {request.email}
                        </Typography>
                        <Button onClick={() => handleAccept(request.request_uuid)}>Accept</Button>
                        <Button onClick={() => handleReject(request.request_uuid)}>Reject</Button>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default AdministerRequest;