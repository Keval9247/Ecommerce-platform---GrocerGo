import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Grid, Typography, FormControl, RadioGroup, FormControlLabel, Radio, Box, Button } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { sha256 } from 'js-sha256';
import { signup as signupAction } from '../store/thunks/authThunks';
import { Input } from '../components';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const parentContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    width: '100%',
    backgroundColor: 'rgba(250, 250, 250, 0.5)',
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#784E83',   
};

const formStyle = {
    position: 'relative',
    zIndex: 1,
    background: 'rgba(255, 255, 255, 0.8)',
    padding: '5rem',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
    width: '20rem',
    maxWidth: '400px',
};

const buttonStyle = {
    backgroundColor: 'rgba(235, 64, 52)',
    color: 'whitesmoke',
    '&:hover': {
        backgroundColor: 'rgba(235, 64, 52, 0.8)',
        color: 'white',
    },
};

function SignUp() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [role, setRole] = useState('user'); // Default role is 'user'
    const [err, setErr] = useState('');

    const handleRoleChange = (event) => {
        setRole(event.target.value);
    };

    const handleSignUp = async (data) => {
        try {
            const hashedPassword = await sha256(data.password);
            const response = await dispatch(signupAction({ name: data.name, email: data.email, password: hashedPassword, role }));
            if (response.type === 'auth/signup/fulfilled') {
                toast.success('Registration Successful');
                navigate('/login');
            } else {
                throw new Error('Failed to create account');
            }
        } catch (error) {
            setErr(error.message || 'Registration failed');
        }
    };

    return (
        <>
            <ToastContainer position="top-right" autoClose={5000} />
            <Box sx={parentContainerStyle}>
                <form onSubmit={handleSubmit(handleSignUp)} style={formStyle}>
                    <Grid container spacing={2} direction="column">
                        <Grid item xs={12}>
                            <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
                                <Typography variant='h4' sx={{ color: '#0b244d', fontSize: '1.6rem', fontWeight: 'bold', mr: '0.2em' }}>
                                    Create an account
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box display="flex" justifyContent="center" alignItems="center">
                                <Typography variant='body2' color='#445775' sx={{ mr: 1 }}>Already have an account?</Typography>
                                <RouterLink to='/login' style={{ textDecoration: 'none' }}>
                                    <Typography color="primary">
                                        Sign In
                                    </Typography>
                                </RouterLink>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Input
                                label="Username"
                                {...register('name', { required: 'Name is required' })}
                                error={!!errors.name}
                                helperText={errors.name ? errors.name.message : ''}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Input
                                label="Email"
                                type="email"
                                {...register('email', { required: 'Email is required' })}
                                error={!!errors.email}
                                helperText={errors.email ? errors.email.message : ''}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Input
                                label="Password"
                                type="password"
                                {...register('password', {
                                    required: 'Password is required',
                                    minLength: { value: 4, message: 'Password must be at least 4 characters' },
                                })}
                                error={!!errors.password}
                                helperText={errors.password ? errors.password.message : ''}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Input
                                label="Confirm Password"
                                type="password"
                                {...register('confirm_password', {
                                    required: 'confirm_password is required',
                                    minLength: { value: 4, message: 'Password must be at least 4 characters' },
                                })}
                                error={!!errors.password}
                                helperText={errors.password ? errors.password.message : ''}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>Choose Your Role:</Typography>
                            <FormControl component="fieldset">
                                <RadioGroup row aria-label="role" name="role" value={role} onChange={handleRoleChange}>
                                    <FormControlLabel value="user" control={<Radio />} label="User" />
                                    <FormControlLabel value="admin" disabled='true' control={<Radio />} label="Admin" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <Button type='submit' variant="contained" sx={buttonStyle} fullWidth>
                                Register
                            </Button>
                        </Grid>
                        {err && (
                            <Grid item xs={12}>
                                <Typography color="error" align="center">{err}</Typography>
                            </Grid>
                        )}
                    </Grid>
                </form>
            </Box>
        </>
    );
}

export default SignUp;
