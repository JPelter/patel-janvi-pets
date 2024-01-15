import EventIcon from '@mui/icons-material/Event';
import React from 'react';
import {Paper, Stack, Typography} from '@mui/material';

import UserMain from './User/UserMain';
import AdministerMain from './Admin/AdministerMain';

function AppointmentMain(props) {
    console.log('AppointmentMain props:', props);
    return (
        <div>
            <Paper elevation={3} style={{ padding: '20px', margin: '20px'}} component={Stack} direction="row" justifyContent="center" alignItems="center" spacing={2}>
                <EventIcon sx={{ fontSize: '3.5rem' }} />
                <Typography variant="h3" sx={{ fontFamily: 'Dancing Script'}}>Appointments!</Typography>
            </Paper>
            <UserMain {...props}/>
            {props.admin && (<AdministerMain {...props}/>)}
        </div>
    );
}

export default AppointmentMain;
