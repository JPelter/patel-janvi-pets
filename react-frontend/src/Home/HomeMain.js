import { Link as RouterLink } from 'react-router-dom';

import PetsIcon from '@mui/icons-material/Pets';
import { Paper, Stack, Typography, Link  } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';


import Services from './Services';

function HomeMain(props) {
    console.log('Home props:', props);
    return (
        <div>
            <Paper elevation={3} style={{ padding: '20px', margin: '20px'}} component={Stack} direction="row" justifyContent="center" alignItems="center" spacing={2}>
                <PetsIcon sx={{ fontSize: '3.5rem' }} /> {/* Adjust the fontSize */}

                <Typography variant="h3" sx={{ fontFamily: 'Dancing Script'}}>Welcome!</Typography> {/* Set the fontFamily */}

                <PetsIcon sx={{ fontSize: '3.5rem' }} /> {/* Adjust the fontSize */}
            </Paper>
            <Paper elevation={3} style={{ padding: '20px', margin: '20px'}} component={Stack} direction="column" justifyContent="center">
                <Typography sx={{ margin: '5px', fontFamily: 'Verdana', fontSize: '1.1rem', color: '#555', fontStyle: 'italic' }}>
                    Checkout the list of offered services below!
                </Typography>
                <Typography sx={{ margin: '5px', fontFamily: 'Verdana', fontSize: '1.1rem', color: '#555', fontStyle: 'italic' }}>
                    Or <Link component={RouterLink} to="/account" underline="hover" sx={{ color: '#009688', fontWeight: 'bold' }}>register/login</Link> to request an appointment!
                </Typography>
            </Paper>
            <Paper elevation={3} style={{ padding: '20px', margin: '20px'}} component={Stack} direction="row" justifyContent="center" alignItems="center" spacing={2}>
                <EventIcon sx={{ fontSize: '3.5rem' }} />
                <Typography variant="h3" sx={{ fontFamily: 'Dancing Script'}}>Services!</Typography>
            </Paper>
            <Services {...props}/>
        </div>
    );
}

export default HomeMain;