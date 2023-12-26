import { Paper, Stack, Typography, Link  } from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import { Link as RouterLink } from 'react-router-dom';

function Home() {
    return (
        <div>
            <Paper elevation={3} style={{ padding: '20px', margin: '20px'}} component={Stack} direction="row" justifyContent="center" alignItems="center" spacing={2}>
                <PetsIcon sx={{ fontSize: '3.5rem' }} /> {/* Adjust the fontSize */}
                <Typography variant="h3" sx={{ fontFamily: 'Brush Script MT'}}>Welcome!</Typography> {/* Set the fontFamily */}
                <PetsIcon sx={{ fontSize: '3.5rem' }} /> {/* Adjust the fontSize */}
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
        </div>
    );
}

export default Home;