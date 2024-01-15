import React from 'react';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography
} from '@mui/material';

import AppointmentRequest from './AppointmentRequest';
import AppointmentUpcoming from './AppointmentUpcoming';
import AppointmentPast from './AppointmentPast';

function UserMain() {
    return (
        <div>
            <Accordion elevation={3} style={{ maxWidth: '100%', marginLeft: '20px', marginRight: '20px', borderTopLeftRadius: '4px', borderTopRightRadius: '4px' }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                    <Typography>Request Appointment</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <AppointmentRequest props/>
                </AccordionDetails>
            </Accordion>
            <Accordion elevation={3} disabled style={{ maxWidth: '100%', marginLeft: '20px', marginRight: '20px' }}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
                >
                <Typography>Upcoming Appointments</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <AppointmentUpcoming props/>
                </AccordionDetails>
            </Accordion>
            <Accordion disabled elevation={3} style={{ maxWidth: '100%', marginBottom: "20px", marginLeft: '20px', marginRight: '20px', borderBottomLeftRadius: '4px', borderBottomRightRadius: '4px' }}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3a-content"
                id="panel3a-header"
                >
                <Typography>Past Appointments</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <AppointmentPast props/>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

export default UserMain;
