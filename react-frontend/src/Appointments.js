import { Paper, Stack, Typography, Link  } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import { Link as RouterLink } from 'react-router-dom';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function AdminAccordion() {
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
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion elevation={3} style={{ maxWidth: '100%', marginLeft: '20px', marginRight: '20px' }}>
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
            <Accordion square={false} elevation={3} style={{ maxWidth: '100%', marginLeft: '20px', marginRight: '20px', borderBottomLeftRadius: '4px', borderBottomRightRadius: '4px' }}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3a-content"
                id="panel3a-header"
                >
                <Typography>Old Appointments</Typography>
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

function Appointments(props) {
    const { admin } = props;
    return (
        <div>
            <Paper elevation={3} style={{ padding: '20px', margin: '20px'}} component={Stack} direction="row" justifyContent="center" alignItems="center" spacing={2}>
                <EventIcon sx={{ fontSize: '3.5rem' }} />
                <Typography variant="h3" sx={{ fontFamily: 'Dancing Script'}}>Appointments!</Typography>
            </Paper>

            <Paper elevation={3} style={{ padding: '20px', margin: '20px'}} component={Stack} direction="column" justifyContent="center">
                <Typography sx={{ margin: '5px', fontFamily: 'Verdana', fontSize: '1.1rem', color: '#555', fontStyle: 'italic' }}>
                    Enjoy the photos and videos below!
                </Typography>
                <Typography sx={{ margin: '5px', fontFamily: 'Verdana', fontSize: '1.1rem', color: '#555', fontStyle: 'italic' }}>
                    Check the <Link component={RouterLink} to="/services" underline="hover" sx={{ color: '#009688', fontWeight: 'bold' }}>services</Link> page for a list of offerings and prices!
                </Typography>
                <Typography sx={{ margin: '5px', fontFamily: 'Verdana', fontSize: '1.1rem', color: '#555', fontStyle: 'italic' }}>
                    Or <Link component={RouterLink} to="/account" underline="hover" sx={{ color: '#009688', fontWeight: 'bold' }}>register/login</Link> to chat and request an appointment!
                </Typography>
            </Paper>
            <Accordion elevation={3} style={{ maxWidth: '100%', marginLeft: '20px', marginRight: '20px', borderTopLeftRadius: '4px', borderTopRightRadius: '4px' }}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                <Typography>Accordion 1</Typography>
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
                <Typography>Accordion 2</Typography>
                </AccordionSummary>
            </Accordion>
            <Accordion square={false} elevation={3} style={{ maxWidth: '100%', marginBottom: "20px", marginLeft: '20px', marginRight: '20px', borderBottomLeftRadius: '4px', borderBottomRightRadius: '4px' }}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3a-content"
                id="panel3a-header"
                >
                <Typography>f Accordion</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                </Typography>
                </AccordionDetails>
            </Accordion>

            {admin && (<AdminAccordion/>)}
        </div>
    );
}

export default Appointments;
