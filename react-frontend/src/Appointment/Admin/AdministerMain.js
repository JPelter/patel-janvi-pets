import React, { useState, useEffect } from 'react';
import axios from 'axios';

import AdministerRequest from './AdministerRequest';
import AdministerAppointment from './AdministerAppointment';


import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography
} from '@mui/material';

const AdministerMain = (props) => {
    console.log('AppointmentMain props:', props);
    const [adminRequests, setAdminRequests] = useState([]);
    const [adminAppointments, setAdminAppointments] = useState([]);
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_REQUEST_ADMIN}`)
            .then((response) => {
                // Handle success
                setAdminRequests(response.data);
            })
            .catch((error) => {
                // Handle error
                console.error('Error fetching requests:', error);
                // Optionally, display an error message to the user
            });
        axios
            .get(`${process.env.REACT_APP_API_APPOINTMENT_ADMIN}`)
            .then((response) => {
                // Handle success
                setAdminAppointments(response.data);
            })
            .catch((error) => {
                // Handle error
                console.error('Error fetching requests:', error);
                // Optionally, display an error message to the user
            });
    }, []);

    const isFirstAccordionDisabled = adminRequests.length === 0;
    const isSecondAccordionDisabled = adminAppointments.length === 0;
    return (
        <div>
            <Accordion elevation={3} style={{ maxWidth: '100%', marginTop: "20px", marginLeft: '20px', marginRight: '20px', borderTopLeftRadius: '4px', borderTopRightRadius: '4px' }} disabled={isFirstAccordionDisabled}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                <Typography>Administer Requests</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <AdministerRequest {...props}/>
                </AccordionDetails>
            </Accordion>
            <Accordion elevation={3} style={{ maxWidth: '100%', marginLeft: '20px', marginRight: '20px', borderBottomLeftRadius: '4px', borderBottomRightRadius: '4px' }} disabled={isSecondAccordionDisabled}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
                >
                <Typography>Administer Appointments</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <AdministerAppointment {...props}/>
                </AccordionDetails>
            </Accordion>
        </div>
    );
};

export default AdministerMain;