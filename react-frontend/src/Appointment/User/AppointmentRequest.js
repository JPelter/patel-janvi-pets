import React, { useState } from 'react';
import axios from 'axios';

import {
    CircularProgress,
    TextField,
    Select,
    MenuItem,
    Button,
    FormControl,
    InputLabel,
    Stack,
    Typography
} from '@mui/material';

const services = ['Checkup', 'Short walk', 'Long walk', 'Vet travel', 'Bath'];

const AppointmentRequest = (props) => {
    console.log('AppointmentRequest props:', props);
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
                setSubmitting(false);
                setSubmitted(true);
            })
            .catch((error) => {
                console.error('Error submitting appointment request:', error);
            });
    };

    return (
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
    );
};

export default AppointmentRequest;
