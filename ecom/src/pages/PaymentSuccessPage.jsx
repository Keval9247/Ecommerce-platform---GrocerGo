import React, { useEffect } from "react";
import { Typography, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { ROLES } from "../Roles/roles";
import { useNavigate } from "react-router-dom";

function PaymentSuccessPage() {
    const isAuthenticated = useSelector((state) => state.authReducer.isAuthenticated)
    const role = useSelector((state) => state.authReducer.role)
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('*');
        } else if (role !== ROLES.USER) {
            navigate('/');
        }
        return () => navigate('/user/payment/success');
    }, [isAuthenticated, role, navigate]);

    return (
        <Grid container justifyContent="center" spacing={2} sx={{ mt: 4 }}>
            <Grid item xs={12} md={8}>
                <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                    Payment Successful
                </Typography>
                <Typography variant="body1" paragraph>
                    Thank you for your purchase!
                </Typography>
            </Grid>
        </Grid>
    );
}

export default PaymentSuccessPage;
