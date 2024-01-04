
import { Paper, Stack, Typography } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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

            <Accordion elevation={3} style={{ maxWidth: '100%', marginLeft: '20px', marginRight: '20px', borderTopLeftRadius: '4px', borderTopRightRadius: '4px' }}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                <Typography>Request Appointment</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography>
                    TODO: Show any currently pending requests with the opportunity to delete/cancel.
                </Typography>
                <Typography>
                    TODO: Show an interface for submitting an appointment request.
                </Typography>
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

            {admin && (<AdminAppointments/>)}

        </div>
    );
}

export default Appointments;
