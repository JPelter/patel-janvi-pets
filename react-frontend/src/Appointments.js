import { Paper, Stack, Typography, Link  } from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import { Link as RouterLink } from 'react-router-dom';

function Appointments(props) {
    return (
        <div style={{ textAlign: 'center' }}>
            <Paper elevation={3} style={{ padding: '20px', margin: '20px'}} component={Stack} direction="row" justifyContent="center" alignItems="center" spacing={2}>
                <PetsIcon sx={{ fontSize: '3.5rem' }} /> {/* Adjust the fontSize */}
                <Typography variant="h3" sx={{ fontFamily: 'Brush Script MT,DancingScript'}}>Appointments!</Typography> {/* Set the fontFamily */}
            </Paper>
        </div>
    );
}

export default Appointments;
