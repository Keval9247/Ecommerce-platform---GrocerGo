import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import { ButtonC, Input } from '../components';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ROLES } from '../Roles/roles';

function Services() {
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state) => state.authReducer.isAuthenticated);
    const role = useSelector((state) => state.authReducer.role);
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('*'); 
        } else if (role !== ROLES.USER) {
            navigate('/'); 
        }
        return navigate('/user/services'); 
    }, [isAuthenticated, role, navigate]);

    const handleBack = () => {
        navigate('/user/');
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setLoading(true); 

            setTimeout(() => {
                const imageUrl = URL.createObjectURL(file);
                setImage(imageUrl);
                setLoading(false); 
            }, 2000);
        }
    };

    return (
        <div>
            <Typography variant='h3'>Welcome to Service page</Typography>
            <Typography variant='h6'>Add Service or Products</Typography>
            <Grid
                container
                justifyContent='center'
                alignItems='center'
                spacing={2}
                style={{ marginTop: '2rem' }}
            >
                <Grid item>
                    <Input
                        type='file'
                        variant='outlined'
                        onChange={handleImageChange}
                    />
                </Grid>
                <Grid item>
                    <ButtonC
                        onClick={handleBack}
                        style={{
                            width: '13rem',
                            fontSize: '1.2rem',
                            fontWeight: 'bold',
                            letterSpacing: '0.05rem',
                            textTransform: 'uppercase',
                            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
                            borderRadius: '8px',
                            marginTop: '2rem',
                            marginBottom: '2rem',
                            backgroundColor: '#a1aba3'
                        }}
                    >
                        Back to Home
                    </ButtonC>
                </Grid>
            </Grid>
            {loading && (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: '2rem'
                    }}
                >
                    <CircularProgress />
                </Box>
            )}
            {!loading && image && (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: '2rem'
                    }}
                >
                    <img
                        src={image}
                        alt='Uploaded'
                        style={{ maxWidth: '100%', maxHeight: '300px' }}
                    />
                </Box>
            )}
        </div>
    );
}

export default Services;
