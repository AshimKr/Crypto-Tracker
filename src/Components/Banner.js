import { Container, Typography } from '@mui/material';
// import { Box } from '@mui/system';
import React from 'react';
import CoinCarousel from './CoinCarousel';
import './Style.css'
// import propTypes from 'prop-types';

function Banner() {
    return (
        <>
            <div className="banner-container">
                <Container maxWidth='lg'>
                    <Typography
                        variant='h2'
                        sx={{ 
                            fontWeight:'bold',
                            paddingTop:8,
                            textAlign:'center',
                            fontFamily:"Montserrat"

                        }}>
                        Crypto Trackers
                    </Typography>
                    <Typography variant='subtitle1'
                    sx={{
                        marginTop:2,
                        textAlign:'center',
                        fontFamily:"Montserrat",
                        color:'darkgray',
                        textTransform:'capitalize',
                        marginBottom:'40px'
                    }}
                    >
                    Get All The Info Regarding Your Favorite Crypto Currency
                    </Typography>

                    <CoinCarousel />
                </Container>
            </div>
        </>
    )
}

// Banner.propTypes ={
//     name: propTypes.string
// }

export default Banner;
