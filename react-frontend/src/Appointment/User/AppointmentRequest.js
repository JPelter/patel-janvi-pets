import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
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
import { MobileDateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs'; // Import dayjs library

const services = ['Checkup', 'Short walk', 'Long walk', 'Vet travel', 'Bath'];

const AppointmentRequest = (props) => {
    console.log('AppointmentRequest props:', props);
    const [targetTime, setTargetTime] = useState('');
    const [selectedService, setSelectedService] = useState('');
    const [loading, setLoading] = useState(true);
    const [submitted, setSubmitted] = useState(false);
    const [requestUuid, setRequestUuid] = useState('');
    const [recurringWeekly, setRecurringWeekly] = useState(false);
    const [recurringEndDate, setRecurringEndDate] = useState('');

    const getExistingRequest = () => {
        axios
            .get(`${process.env.REACT_APP_API_REQUEST_APPOINTMENT}`)
            .then((response) => {
                if (response.status === 200) {
                    console.log('Existing request response:', response.data);
                    setSubmitted(true);
                    const { target_time, service_requested, request_uuid, recurring_weekly, recurring_enddate } = response.data;
                    setSelectedService(service_requested);
                    setRequestUuid(request_uuid);
                    setRecurringWeekly(recurring_weekly);
                    setRecurringEndDate(recurring_enddate);
                    setTargetTime(target_time);
                    // Convert the timestamp to a Date object
                    const dateObject = new Date(target_time);
                    const localDateTimeString = dateObject.toLocaleString();
                    setTargetTime(localDateTimeString);
                }
            })
            .catch((error) => {
                console.error('Error making GET request:', error);
            });
        setLoading(false);
    };

    useEffect(() => {
        getExistingRequest();
    }, []);

    const handleTargetTimeChange = (value) => {
        setTargetTime(value);
    };

    const handleServiceChange = (event) => {
        setSelectedService(event.target.value);
    };

    const handleSubmit = () => {
        setLoading(true);

        const requestData = {
            target_time: targetTime,
            service_requested: selectedService,
        };
        axios
            .post(`${process.env.REACT_APP_API_REQUEST_APPOINTMENT}`, requestData)
            .then((response) => {
                setRequestUuid(response.data.request_uuid); // Set the request_uuid when there's a response
                // Convert the timestamp to a Date object
                const dateObject = new Date(targetTime);
                const localDateTimeString = dateObject.toLocaleString();
                setTargetTime(localDateTimeString);
                setLoading(false);
                setSubmitted(true);
            })
            .catch((error) => {
                console.error('Error submitting appointment request:', error);
            });
    };

    const handleCancel = () => {
        setLoading(true);

        axios
            .delete(`${process.env.REACT_APP_API_REQUEST_APPOINTMENT}`, { data: {request_uuid: requestUuid} })
            .then((response) => {
                setRequestUuid('');
                setRecurringWeekly(false);
                setRecurringEndDate('');
                setTargetTime('');
                setSelectedService('');
                setSubmitted(false);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error canceling appointment request:', error);
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
                height: '250px', // Conditionally set fixed height
            }}
        >
            {loading && <CircularProgress />}
            {!loading && !submitted && (
                <>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <MobileDateTimePicker
                            id="targetTime"
                            label="Target Time"
                            placeholder="Click to pick a time!"
                            value={targetTime}
                            onChange={handleTargetTimeChange}
                            renderInput={(params) => <TextField {...params} />}
                            InputLabelProps={{ shrink: true }}
                            sx={{ width: '100%' }}
                            required
                            minutesStep={5}
                            minDateTime={dayjs().add(2, 'days')} // Set the earliest datetime (2 days from now)
                            maxDateTime={dayjs().add(14, 'days')} // Set the latest datetime (7 days from now)
                        />
                    </LocalizationProvider>
                    <FormControl sx={{ width: '100%' }}>
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
            
            {!loading && submitted && (
                <>
                    <Typography>Submitted!</Typography>
                    <Typography>Target Time: {targetTime}</Typography>
                    <Typography>Service Requested: {selectedService}</Typography>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleCancel}
                        sx={{ width: '100%' }} // Set width to 100%
                    >
                        Cancel Appointment
                    </Button>
                </>
            )}
        </Stack>
    );
};

export default AppointmentRequest;
