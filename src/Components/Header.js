import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { createTheme, MenuItem, Select, ThemeProvider } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import { CryptoState } from '../CryptoContext';


const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});



export default function Header() {
    const navigate = useNavigate();
    const { currency, setCurrency } = CryptoState();
    // console.log(currency);

    return (
        <ThemeProvider theme={darkTheme}>

            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" onClick={() => navigate('/')} component="div" sx={{ flexGrow: 1, color: 'gold', fontFamily: 'Montserrat', fontWeight: 'bolder', cursor: 'pointer' }}>
                            MyCrypto
                        </Typography>

                        <Select
                            variant='outlined'
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                        >
                            <MenuItem value={'USD'}>USD</MenuItem>
                            <MenuItem value={'INR'}>INR</MenuItem>
                        </Select>
                        
                    </Toolbar>
                </AppBar>
            </Box>
        </ThemeProvider>
    );
}
