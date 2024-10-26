import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import { readoneProduct } from "../store/thunks/productThunk";
import { createPayment } from "../store/thunks/productThunk"; // Adjust path as per your project structure
import { ROLES } from "../Roles/roles";

function Payment() {
  const { _id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const product = useSelector((state) => state.productsReducer.products);
  const isAuthenticated = useSelector((state) => state.authReducer.isAuthenticated);
  const role = useSelector((state) => state.authReducer.role);
  const [producta, setProducta] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login'); // Redirect to login if not authenticated
    } else if (role !== ROLES.USER) {
      navigate('/'); // Redirect to home if not a user
    } else {
      readProduct();
    }
    return () => navigate(`/user/payment/${_id}`); // Redirect to product details page when the component unmounts
  }, [dispatch, navigate, isAuthenticated, role]);

  const readProduct = async () => {
    try {
      const response = await dispatch(readoneProduct(_id));
      console.log("🚀 ~ readProduct ~ response:", response)
      setProducta(response.payload); // Assuming readoneProduct returns product data correctly
    } catch (error) {
      console.log(error);
    }
  };

  const handleToken = async (token) => {
    if (token && token.email) {
      // Make a request to your server to process the payment
      try {
        const response = await dispatch(createPayment({
          token: token,
          cartdata: {
            items: [{
              price: producta.price,
              name: producta.name,
            }],
          },
          totalPrice: producta.price, // Adjust as per your calculation on the backend
        }));
        console.log("Payment response:", response);
        toast.success("Payment successful!"); 
        navigate('/user/payment/success'); // Redirect to success page after successful payment
      } catch (error) {
        console.error("Payment error:", error);
        toast.error("Payment failed. Please try again.");
      }
    } else {
      console.error("Token or email not provided in Stripe token:", token);
      toast.error("Payment failed. Missing token information.");
    }
  };

  if (!producta) {
    return null; // Render loading spinner or message while product data is fetched
  }

  return (
    <Grid container justifyContent="center" spacing={2} sx={{ mt: 20 }}>
      <Grid item xs={12} md={8}>
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold' }}>
          Payment Details
        </Typography>
        <Paper elevation={5} sx={{ p: 3,
          display: 'flex',
          justifyContent: 'center',
          gap: 2,
          alignItems: 'center',
          flexDirection:'column',
          mb: 3,
          width: '100%',
          maxWidth: 400,
          margin: '0 auto'
         } }>
          <Typography variant="body1" paragraph>
            Please click on <strong>Pay button</strong> to buy this product. <br />
            Enter your credit card details to proceed with the payment. <br />
            You will be redirected to the payment page.
          </Typography>
          <Typography variant="body1" paragraph color="red">
            Note: The actual payment processing is handled by Stripe, and this is a simulated example.
          </Typography>
          <TableContainer component={Paper} elevation={3} sx={{ mb: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Product Name</strong></TableCell>
                  <TableCell align="right"><strong>Price</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>{producta.name}</TableCell>
                  <TableCell align="right">${producta.price}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <StripeCheckout
            stripeKey={import.meta.env.VITE_APP_STRIPE_KEY} // Replace with your Stripe publishable key
            token={handleToken}
            name={producta.name}
            amount={producta.price * 100} // Amount in cents
            currency="USD"
            locale="auto"
          >
            <Button
              sx={{ backgroundColor: "#00264d", color: "#ffffff", "&:hover": { backgroundColor: "#004080" } }}
              variant="contained"
              // fullWidth/
            >
              Pay Now ${producta.price}
            </Button>
          </StripeCheckout>
        </Paper>
      </Grid>
      <ToastContainer position="top-right" autoClose={2000} />
    </Grid>
  );
}

export default Payment;
