// ContactUs.js
import React, { useEffect, useState } from 'react';
import { Container, Typography, TextField, Button, Box, Snackbar, Alert } from '@mui/material';
import { motion } from 'framer-motion';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ROLES } from '../Roles/roles';

const MotionBox = motion(Box);

const ContactUs = () => {
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state) => state.authReducer.isAuthenticated)
    const role = useSelector((state) => state.authReducer.role)
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('*')
        }
        else if (role !== ROLES.USER) {
            navigate('/')
        }
        return () => navigate('/user/contact-us')
    })
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send the form data to your backend
        console.log('Form submitted:', formData);
        setOpenSnackbar(true);
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <Container maxWidth="md" sx={{ py: 8 }}>
            <Typography variant="h2" align="center" gutterBottom>
                Contact Us
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
                We'd love to hear from you. Send us a message!
            </Typography>
            <MotionBox  
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 4 }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Your Name"
                    name="name"
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleChange}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="message"
                    label="Your Message"
                    id="message"
                    multiline
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                        mt: 3,
                        mb: 2,
                        bgcolor: '#1976d2',
                        '&:hover': {
                            bgcolor: '#115293',
                        },
                    }}
                    endIcon={<SendIcon />}
                >
                    Send Message
                </Button>
            </MotionBox>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
                    Your message has been sent successfully!
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default ContactUs;