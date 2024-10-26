import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ROLES } from '../Roles/roles';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Typography,
    Card,
    CardContent,
    CardMedia,
    Grid,
    IconButton,
    Divider,
    Paper,
    Container,
    Fade,
    useTheme,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { ButtonC } from '../components';
import { ToastContainer, toast } from 'react-toastify';
import StripeCheckout from 'react-stripe-checkout';
import { getCart, createPayment, removeCartItem } from '../store/thunks/productThunk';
import { ItemCenterStyle } from '../css/ItemsCenter';

function Cart() {
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state) => state.authReducer.isAuthenticated);
    const role = useSelector((state) => state.authReducer.role);
    const [cartdata, setCartData] = useState({ items: [] });
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('*');
        } else if (role !== ROLES.USER) {
            navigate('/');
        } else {
            fetchCart();
        }
        return () => navigate('/user/cart');
    }, [isAuthenticated, role, navigate]);

    const fetchCart = async () => {
        try {
            const response = await dispatch(getCart());
            if (response.payload && response.payload.cart) {
                setCartData(response.payload.cart);
            } else {
                setCartData({ items: [] });
            }
        } catch (error) {
            console.error('Error fetching cart:', error);
            setCartData({ items: [] });
        }
    };

    const handleRemoveItem = async (productId) => {
        try {
            const response = await dispatch(removeCartItem({ productId }));
            setCartData((prevCart) => ({
                ...prevCart,
                items: prevCart.items.filter((item) => item.productId !== productId),
            }));
            toast.success('Item removed from cart.');
            fetchCart();
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };

    useEffect(() => {
        const calculateTotal = () => {
            return cartdata.items.reduce((total, item) => total + item.price * item.quantity, 0);
        };
        setTotalPrice(calculateTotal());
    }, [cartdata.items]);

    const handleToken = (token) => {
        if (token && token.email) {
            toast.success('Payment successful!');
            setCartData({ items: [] });
        } else {
            toast.error('Payment failed. Missing token information.');
        }
    };

    const createPaymentHandler = async () => {
        try {
            const token = {
                email: 'bkenil583@gmail.com',
                id: 'tok_visa',
            };
            if (cartdata.items.length > 0) {
                const response = await dispatch(createPayment({ token, cartdata, totalPrice }));
            } else {
                toast.error('No products in cart to create payment.');
            }
        } catch (error) {
            console.error('Error creating payment:', error);
            toast.error('Payment failed. Please try again.');
        }
    };

    return (
        <div style={{ ...ItemCenterStyle, height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Container
                maxWidth="lg"
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    padding: 0, // Ensure no extra padding affects centering
                }}
            >
                <Paper
                    elevation={3}
                    sx={{
                        p: 5,
                        borderRadius: 5,
                        width: '100%',
                        maxWidth: '900px', // Adjust max width as needed
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        height: 'auto', // Ensure height is dynamic based on content
                    }}
                >
                    <Typography variant="h3" mb={3} color="primary" fontWeight="bold">
                        Your Cart <ShoppingCartIcon fontSize="large" sx={{ verticalAlign: 'bottom', ml: 3 }} />
                    </Typography>
                    {!Array.isArray(cartdata.items) || cartdata.items.length === 0 ? (
                        <>
                            <Typography variant="h6" mb={4} color="text.secondary">
                                Your cart is empty.
                            </Typography>
                            <ButtonC variant="contained" onClick={() => navigate('/user/products-list')}>
                                Select / View Products
                            </ButtonC>
                        </>
                    ) : (
                        <Fade in={true} timeout={1000}>
                            <Box>
                                <Grid container spacing={3}>
                                    {cartdata.items.map((item) => (
                                        <Grid item xs={12} sm={6} md={4} key={item.productId}>
                                            <Card
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    height: '100%',
                                                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                                                    '&:hover': {
                                                        transform: 'scale(1.03)',
                                                        boxShadow: theme.shadows[10],
                                                    },
                                                }}
                                            >
                                                <CardMedia
                                                    component="img"
                                                    height="140"
                                                    image={`http://localhost:4000${item.category}`}
                                                    alt={item.name}
                                                />
                                                <CardContent sx={{ flexGrow: 1 }}>
                                                    <Typography variant="h6" gutterBottom>
                                                        {item.name}
                                                    </Typography>
                                                    <Typography variant="body1" color="primary" fontWeight="bold">
                                                        Price: ${item.price}
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        Quantity: {item.quantity}
                                                    </Typography>
                                                </CardContent>
                                                <IconButton
                                                    aria-label="delete"
                                                    onClick={() => handleRemoveItem(item.productId)}
                                                    sx={{ alignSelf: 'flex-end', m: 1 }}
                                                >
                                                    <DeleteIcon color="error" />
                                                </IconButton>
                                            </Card>
                                        </Grid>
                                    ))}
                                </Grid>
                                <Divider sx={{ my: 5 }} />
                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                    <Typography variant="h5" fontWeight="bold">
                                        Total: ${totalPrice}
                                    </Typography>
                                    <StripeCheckout
                                        stripeKey={import.meta.env.VITE_APP_STRIPE_KEY}
                                        token={handleToken}
                                        amount={totalPrice * 100}
                                        currency="USD"
                                        locale="auto"
                                    >
                                        <ButtonC
                                            sx={{ backgroundColor: '#00264d', color: '#ffffff' }}
                                            variant="contained"
                                            onClick={createPaymentHandler}
                                        >
                                            Pay Now
                                        </ButtonC>
                                    </StripeCheckout>
                                    <ToastContainer position="top-right" autoClose={2000} />
                                </Box>
                            </Box>
                        </Fade>
                    )}
                </Paper>
            </Container>
        </div>
    );
}

export default Cart;
