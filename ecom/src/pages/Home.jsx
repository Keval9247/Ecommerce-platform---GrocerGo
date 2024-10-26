import React, { useEffect, useState } from 'react';
import { Button, Typography, Container, Box, Grid, Paper, Snackbar, Alert } from '@mui/material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
// import image from '../../../icons/Background.gif';
import ExploreIcon from '@mui/icons-material/Explore';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import InfoIcon from '@mui/icons-material/Info';
import { ItemCenterStyle } from '../css/ItemsCenter';
import { ButtonC, Input } from '../components';
import { red } from '@mui/material/colors';


const MotionTypography = motion(Typography);
const MotionBox = motion(Box);
const MotionPaper = motion(Paper);


const Home = () => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setVisible((prevVisible) => !prevVisible)
        }, 250);
        // console.log("🚀 ~ intervalId ~ intervalId:", intervalId)
        return () => clearInterval(intervalId);
    }, []);


    return (

        <>

            <Container sx={{ ...ItemCenterStyle, minHeight: '100vh', py: 8 }}>
                <Grid container spacing={4} justifyContent="center" alignItems="center">
                    <Grid item xs={12} md={6} >
                        <MotionTypography
                            variant="h3"
                            sx={{ gap: '2rem', mb: 2, color: '#8a6363', fontWeight: 'bold' }}
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 2 }}
                        >
                            You're Welcome ! <br />
                            <MotionTypography>
                                You can use this app anytime you want.. <br />
                                Auth App is a powerful, easy-to-use, and secure authentication solution for your digital world.
                            </MotionTypography>
                        </MotionTypography>
                        <MotionTypography
                            variant="h5"
                            sx={{ mb: 4, color: '#666' }}
                            initial={{ opacity: 0, y: -30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            Discover powerful features and transform your workflow today.
                        </MotionTypography>
                        <MotionBox sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'row' },
                            gap: 2,
                            mb: 4,
                        }}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 2}}
                        >
                            <ButtonC
                                variant="contained"
                                color="primary"
                                component={Link}
                                to="/user/products-list"
                                startIcon={<ExploreIcon />}
                                sx={{
                                    py: 1.5,
                                    px: 3,
                                    borderRadius: '30px',
                                    backgroundColor: '#c9b2ab',
                                    '&:hover': {
                                        color:'#302522',
                                        backgroundColor: '#c9b2ab',
                                        transform: 'translateY(-3px)',
                                        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
                                    },
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                Explore Products
                            </ButtonC>
                        </MotionBox>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <MotionPaper
                            elevation={6}
                            sx={{
                                borderRadius: '16px',
                                overflow: 'hidden',
                                position: 'relative',
                                boxShadow: '0px 0px  20px 10px rgba(189, 100, 100, 0.7)', // Adjusted shadow for a more subtle effect
                                padding: '2rem', // Adding padding for internal spacing
                                backgroundColor: '#ffffff',
                            }}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                        >
                            {/* <img
                                src={image}
                                alt="Home"
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    display: 'block',
                                }}
                            /> */}
                            <Box sx={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                // top:0,
                                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                color: 'white',
                                padding: 2,
                                textAlign: 'center',
                            }}
                            >
                                <Typography variant="h6" color={'#ffd1d1'} sx={{ visibility: visible ? "visible" : "hidden" }}>
                                    Don't delay — sales today!
                                </Typography>
                            </Box>
                        </MotionPaper>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default Home;