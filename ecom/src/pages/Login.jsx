import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { sha256 } from 'js-sha256';
import { Button, Grid, IconButton, InputAdornment, TextField, Typography, Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { login } from '../store/thunks/authThunks';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginIcon from '@mui/icons-material/Login';
import { Input } from '../components';

const parentContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    width: '100%',
    // backgroundColor: 'rgba(250, 250, 250, 0.5)',
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

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [err, setErr] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = async (data) => {
        try {
            const hashedPassword = await sha256(data.password);
            const response = await dispatch(login({ email: data.email, password: hashedPassword }));
            if (response.type === 'auth/login/fulfilled') {
                toast.success('Login Successfully');
                localStorage.setItem('token', response.payload.user.token);
                document.cookie = `Authorization=${response.payload.user.token}; Secure; SameSite=Strict`;
                navigate('/');
            } else {
                throw new Error('Invalid credentials or unexpected response format');
            }
        } catch (error) {
            setErr(error.message || 'Login failed');
        }
    };

    return (
        <>
            <ToastContainer position="top-right" autoClose={5000} />
            <Box sx={parentContainerStyle}>
                <form onSubmit={handleSubmit(handleLogin)} style={formStyle}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
                                <Typography variant='h4' sx={{ color: '#0b244d', fontSize: '1.6rem', fontWeight: 'bold', mr: '0.2em' }}>
                                    Sign in to your account
                                </Typography>
                                <LoginIcon sx={{ fontSize: '1.6rem', color: '#0b244d' }} />
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box display="flex" justifyContent="center" alignItems="center">
                                <Typography variant='body2' color='#445775' sx={{ mr: 1 }}>Don't have an account ?</Typography>
                                <RouterLink to='/signup' style={{ textDecoration: 'none' }}>
                                    <Typography color="primary">
                                        Sign Up
                                    </Typography>
                                </RouterLink>
                            </Box>
                        </Grid>
                        <Grid sx={{
                            mt: 2,
                            mb: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem',

                            width: '100%',
                            color: '#445775',
                            cursor: 'pointer',
                        }}>
                            <Input
                                label="Enter email"
                                fullWidth
                                type="email"
                                {...register('email', { required: 'Email is required' })}
                                error={!!errors.email}
                                helperText={errors.email ? errors.email.message : ''}
                            />
                            <Input
                                label="Enter password"
                                fullWidth
                                type={showPassword ? 'text' : 'password'}
                                {...register('password', {
                                    required: 'Password is required',
                                    minLength: { value: 4, message: 'Password must be at least 4 characters' },
                                })}
                                error={!!errors.password}
                                helperText={errors.password ? errors.password.message : ''}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={handleTogglePasswordVisibility}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Box display="flex" justifyContent="flex-end">
                                <RouterLink to='/forgot-password' style={{ textDecoration: 'none' }}>
                                    <Typography variant='body2' color="primary">
                                        Forgot Password?
                                    </Typography>
                                </RouterLink>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Button type='submit' variant="contained" color="primary" fullWidth>
                                Log in
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

export default Login;