import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography } from '@mui/material';

const AppointmentUpcoming = (props) => {
    console.log('AppointmentUpcoming props:', props);

    return (
        <div>
            {props.upcomingAppointments.map((appt) => (
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h5" component="div">
                            {appt.service_requested}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Target Time: {appt.appointment_time}
                        </Typography>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default AppointmentUpcoming;
