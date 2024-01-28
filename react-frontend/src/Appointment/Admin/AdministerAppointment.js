import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
// import axios from 'axios';

const AdministerAppointment = (props) => {
    console.log('AppointmentAppointment props:', props);
    return (
        <div>
            {props.adminAppointments.map((appt) => (
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h5" component="div">
                            {appt.service_requested}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Target Time: {appt.appointment_time}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Email: {appt.email}
                        </Typography>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default AdministerAppointment;
