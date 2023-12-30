import { Paper, Stack, Typography } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function Services(props) {
    //const { admin } = props;
    return (
        <div>
            <Paper elevation={3} style={{ padding: '20px', margin: '20px'}} component={Stack} direction="row" justifyContent="center" alignItems="center" spacing={2}>
                <EventIcon sx={{ fontSize: '3.5rem' }} />
                <Typography variant="h3" sx={{ fontFamily: 'Dancing Script'}}>Services!</Typography>
            </Paper>

            <Accordion elevation={3} style={{ maxWidth: '100%', marginLeft: '20px', marginRight: '20px', borderTopLeftRadius: '4px', borderTopRightRadius: '4px' }}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                <Typography>Pet Checkup</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography>
                    A short visit to check on your pet: refill food, refresh water, let outside.
                </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion elevation={3} style={{ maxWidth: '100%', marginLeft: '20px', marginRight: '20px' }}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
                >
                <Typography>Short Walk</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography>
                    A pet checkup with a 15 minute walk around the neighborhood.
                </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion elevation={3} style={{ maxWidth: '100%', marginLeft: '20px', marginRight: '20px' }}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
                >
                <Typography>Long Walk</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography>
                    A pet checkup with a 30 minute walk to tire your animal out!
                </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion elevation={3} style={{ maxWidth: '100%', marginLeft: '20px', marginRight: '20px' }}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3a-content"
                id="panel3a-header"
                >
                <Typography>Pet Sitting</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography>
                    A longer pet checkup, for animals that need more time with a person but not a walk outside.
                </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion elevation={3} style={{ maxWidth: '100%', marginLeft: '20px', marginRight: '20px'}}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3a-content"
                id="panel3a-header"
                >
                <Typography>Bath</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography>
                    For when your pet needs shampooed and scrubed clean!
                </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion elevation={3} style={{ maxWidth: '100%', marginBottom: "20px", marginLeft: '20px', marginRight: '20px', borderBottomLeftRadius: '4px', borderBottomRightRadius: '4px' }}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3a-content"
                id="panel3a-header"
                >
                <Typography>Grooming</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography>
                    For when your pet needs their hair cut, nails clipped, and pads filed, includes a bath.
                </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

export default Services;