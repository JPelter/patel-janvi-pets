
import EventIcon from '@mui/icons-material/Event';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { useState } from 'react';
import axios from 'axios';

import {

    Accordion,
    AccordionSummary,
    AccordionDetails,
    CircularProgress,
    TextField,
    Select,
    MenuItem,
    Button,
    FormControl,
    InputLabel,
    Paper, Stack, Typography
} from '@mui/material';

const services = ['Checkup', 'Short walk', 'Long walk', 'Vet travel', 'Bath'];


function UserAppointments() {
    const [targetTime, setTargetTime] = useState('');
    const [selectedService, setSelectedService] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleTargetTimeChange = (event) => {
        setTargetTime(event.target.value);
    };

    const handleServiceChange = (event) => {
        setSelectedService(event.target.value);
    };

    const handleSubmit = () => {
        setSubmitting(true);

        const requestData = {
            target_time: targetTime,
            service_requested: selectedService,
        };
        axios
            .post(`${process.env.REACT_APP_API_REQUEST_APPOINTMENT}`, requestData)
            .then((response) => {
                // Handle success
                setSubmitting(false);
                setSubmitted(true);
                // Optionally, handle UI updates or success message
            })
            .catch((error) => {
                // Handle error
                console.error('Error submitting appointment request:', error);
                setSubmitting(false);
                // Optionally, display an error message to the user
            });
    };

    return (
        <>
            <Accordion elevation={3} style={{ maxWidth: '100%', marginLeft: '20px', marginRight: '20px', borderTopLeftRadius: '4px', borderTopRightRadius: '4px' }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                    <Typography>Request Appointment</Typography>
                </AccordionSummary>
                    <AccordionDetails>
                    <Stack
                        direction="column"
                        spacing={2}
                        justifyContent="center"
                        alignItems="center"
                        sx={{
                            width: '100%', // Make sure the Stack occupies full width
                            minHeight: submitting || submitted ? '200px' : 'auto', // Conditionally set fixed height
                        }}
                    >
                        {/* Check when open request already exists and display details */}
                        {!submitting && !submitted && (
                            <>
                                <TextField
                                    id="targetTime"
                                    label="Target Time"
                                    type="datetime-local"
                                    value={targetTime}
                                    onChange={handleTargetTimeChange}
                                    InputLabelProps={{ shrink: true }}
                                    sx={{ width: '100%' }} // Set width to 100%
                                    required // Mark as required
                                    inputProps={{ min: new Date().toISOString().slice(0, 16) }} // Disable past dates
                                />
                                <FormControl sx={{ width: '100%' }}> {/* Set width to 100% */}
                                    <InputLabel id="serviceLabel" required>Select Service</InputLabel>
                                    <Select
                                        labelId="serviceLabel"
                                        label="Select Service"
                                        value={selectedService}
                                        onChange={handleServiceChange}
                                        sx={{width: '100%'}}
                                    >
                                        {services.map((service, index) => (
                                            <MenuItem key={index} value={service}>
                                                {service}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleSubmit}
                                    sx={{ width: '100%' }} // Set width to 100%
                                    disabled={!targetTime || !selectedService} // Disable button if any field is empty
                                >
                                    Submit
                                </Button>
                            </>
                        )}
                        {submitting && <CircularProgress />} {/* Show loading wheel when submitting */}
                        {submitted && <Typography>Submitted!</Typography>} {/* Show "Submitted!" when request is submitted */}
                    </Stack>
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
                <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion elevation={3} disabled style={{ maxWidth: '100%', marginLeft: '20px', marginRight: '20px' }}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
                >
                <Typography>Old Requests</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                </Typography>
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
                <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                </Typography>
                </AccordionDetails>
            </Accordion>
        </>
    );
}

function AdminAppointments() {
    return ( 
        <>
            <Accordion elevation={3} style={{ maxWidth: '100%', marginTop: "20px", marginLeft: '20px', marginRight: '20px', borderTopLeftRadius: '4px', borderTopRightRadius: '4px' }}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                <Typography>Administer Requests</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography>
                    TODO: LIST OF OPEN REQUESTS!
                </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion elevation={3} style={{ maxWidth: '100%', marginLeft: '20px', marginRight: '20px' }}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
                >
                <Typography>Administer Appointments</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography>
                    TODO: LIST OF ALL UPCOMING APPOINTMENTS!
                </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion elevation={3} disabled style={{ maxWidth: '100%', marginLeft: '20px', marginRight: '20px' }}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
                >
                <Typography>All Old Requests</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography>
                    TODO: LIST OF ALL OLD REQUESTS!
                </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion elevation={3} style={{ maxWidth: '100%', marginLeft: '20px', marginRight: '20px', borderBottomLeftRadius: '4px', borderBottomRightRadius: '4px' }}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3a-content"
                id="panel3a-header"
                >
                <Typography>All Old Appointments</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography>
                    TODO: LIST OF ALL OLD APPOINTMENTS!
                </Typography>
                </AccordionDetails>
            </Accordion>
        </>
    );
}

function Appointments(props) {
    const { admin } = props;
    return (
        <div>
            <Paper elevation={3} style={{ padding: '20px', margin: '20px'}} component={Stack} direction="row" justifyContent="center" alignItems="center" spacing={2}>
                <EventIcon sx={{ fontSize: '3.5rem' }} />
                <Typography variant="h3" sx={{ fontFamily: 'Dancing Script'}}>Appointments!</Typography>
            </Paper>
            <UserAppointments/>
            {admin && (<AdminAppointments/>)}
        </div>
    );
}

export default Appointments;
