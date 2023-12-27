import { Paper, Stack, Typography, Link  } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import { Link as RouterLink } from 'react-router-dom';

function Appointments(props) {
    return (
        <div style={{ textAlign: 'center' }}>
            <Paper elevation={3} style={{ padding: '20px', margin: '20px'}} component={Stack} direction="row" justifyContent="center" alignItems="center" spacing={2}>
                <EventIcon sx={{ fontSize: '3.5rem' }} />
                <Typography variant="h3" sx={{ fontFamily: 'Dancing Script'}}>Appointments!</Typography>
            </Paper>
        </div>
    );
}

export default Appointments;
