import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  CircularProgress
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import LockResetIcon from '@mui/icons-material/LockReset';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { forgetPassword } from '../store/thunks/authThunks';
import { useDispatch } from 'react-redux';

function ForgotPassword() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch()
  const Navigate = useNavigate();


  const handleResetPassword = async (email) => {
    console.log("��� ~ handleResetPassword ~ email:", email)
    setIsLoading(true);
    try {
      const a = await dispatch(forgetPassword(email));
      console.log("🚀 ~ handleResetPassword ~ a:", a)
      if (a.payload.success === true) {
        toast.success('Password reset link sent to your email!');
        Navigate('/login');
      }
      else {
        toast.error('Failed to send reset email. Please try again later.');
      }
    } catch (error) {
      console.error('Error sending password reset email:', error);
      toast.error('Failed to send reset email. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };
  // useEffect(() => {
  //   handleResetPas sword()
  // }, [])

  const onSubmit = async (data) => {
    console.log("🚀 ~ onSubmit ~ data:", data)
    setIsLoading(true);
    try {
      const response = await handleResetPassword(data.email);
      console.log("response : ", response);
    } catch (error) {
      console.error('Error sending password reset email:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ mt: 8, p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <LockResetIcon sx={{ m: 1, fontSize: 40, color: 'primary.main' }} />
        <Typography component="h1" variant="h5">
          Forgot Password
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1, width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : 'Reset Password'}
          </Button>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <RouterLink to="/login" style={{ textDecoration: 'none' }}>
              <Typography variant="body2" color="primary">
                Back to Login
              </Typography>
            </RouterLink>
            <RouterLink to="/signup" style={{ textDecoration: 'none' }}>
              <Typography variant="body2" color="primary">
                Sign Up
              </Typography>
            </RouterLink>
          </Box>
        </form>
      </Paper>
      <ToastContainer position='top-right' autoClose={5000} hideProgressBar={false} />
    </Container>
  );
}

export default ForgotPassword;
