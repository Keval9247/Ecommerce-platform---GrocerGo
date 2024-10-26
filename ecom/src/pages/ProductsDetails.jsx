import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ROLES } from '../Roles/roles';
import { readoneProduct } from '../store/thunks/productThunk';
import { Button, CircularProgress, Grid, Typography, Box, TextField, Rating } from '@mui/material';

export default function ProductsDetails() {
    const navigate = useNavigate();
    const { _id } = useParams();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.authReducer.isAuthenticated);
    const role = useSelector((state) => state.authReducer.role);
    const product = useSelector((state) => state.productsReducer.product);
    const loading = useSelector((state) => state.productsReducer.loading);
    const error = useSelector((state) => state.productsReducer.error);
    const [productDetails, setProductDetails] = useState(null);
    console.log("🚀 ~ ProductsDetails ~ productDetails:", productDetails)
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(0);
    const [reviewError, setReviewError] = useState(null);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('*'); // Redirect to login if not authenticated
        } else if (role !== ROLES.USER) {
            navigate('/'); // Redirect to home if not a user
        } else {
            fetchProductData();
        }
        return () => navigate(`/user/products-list/${_id}`);
    }, [dispatch, navigate, isAuthenticated, role, _id]);

    const fetchProductData = async () => {
        try {
            const response = await dispatch(readoneProduct(_id));
            setProductDetails(response.payload);
        } catch (error) {
            console.log("Error fetching product data: ", error);
        }
    };

    useEffect(() => {
        if (product) {
            setProductDetails(product); // Update product details state when product is fetched
        }
    }, [product]);

    const handleAddReview = () => {
        if (review.trim() === '' || rating === 0) {
            setReviewError('Please provide both a review and a rating.');
            return;
        }
        // Add review logic goes here
        alert('Review added successfully!');
        setReview('');
        setRating(0);
        setReviewError(null);
    };

    const backToProducts = () => {
        navigate('/user/products-list/');
    }

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
                <CircularProgress />
            </div>
        );
    }

    if (error) {
        return (
            <Typography variant="h6" align="center" style={{ marginTop: '2rem' }}>
                Error loading product details. Please try again later.
            </Typography>
        );
    }

    if (!productDetails) {
        return (
            <>
                <Typography variant="h6" align="center" style={{ marginTop: '2rem' }}>
                    Product not found.
                </Typography>
                <Button
                    onClick={backToProducts}
                    variant="contained"
                    color="primary"
                    size="medium"
                    sx={{ marginTop: '2rem' }}>
                    Back to Products
                </Button>
            </>
        );
    }

    return (
        <Box sx={{ padding: 4, margin: '5rem', backgroundColor: '#f5f5f5', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            display:'flex',
            flexDirection:'column',
            justifyContent:'space-between',
            alignItems:'center',
            gap:2,
            marginBottom: '2rem',
            padding: '2rem',
         }}>
            <Typography variant="h4" align="center" sx={{ marginBottom: 3 }}>
                Product Details
            </Typography>
            <Grid container spacing={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Grid item xs={12}>
                    <img 
                        src={`http://localhost:4000${productDetails.category}`} 
                        alt={productDetails?.name} 
                        style={{
                            width: '100%',
                            height: 'auto',
                            maxWidth: '600px',
                            borderRadius: '8px',
                            boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
                            marginBottom: '1rem',
                        }} 
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                        {productDetails.name}
                    </Typography>
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                        Price: ${productDetails.price}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ maxWidth: '600px', textAlign: 'center', marginBottom: 2 }}>
                        {productDetails.description}
                    </Typography>
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                    <Button
                        onClick={() => navigate(`/user/payment/${_id}`)}
                        variant="contained"
                        color="primary"
                        sx={{
                            padding: '10px 20px',
                            fontWeight: 'bold',
                            borderRadius: '8px',
                            backgroundColor: '#4caf50',
                            '&:hover': {
                                backgroundColor: '#388e3c',
                            },
                        }}>
                        Buy Now
                    </Button>
                </Grid>
                <Grid item xs={12} sx={{ marginTop: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        Add a Review
                    </Typography>
                    <TextField
                        label="Your Review"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        sx={{ marginBottom: 2 }}
                    />
                    <Rating
                        name="rating"
                        value={rating}
                        onChange={(e, newValue) => setRating(newValue)}
                        sx={{ marginBottom: 2 }}
                    />
                    {reviewError && (
                        <Typography color="error" variant="body2" sx={{ marginBottom: 2 }}>
                            {reviewError}
                        </Typography>
                    )}
                    <Button
                        onClick={handleAddReview}
                        variant="contained"
                        color="primary"
                        sx={{
                            padding: '10px 20px',
                            borderRadius: '8px',
                            backgroundColor: '#2196f3',
                            '&:hover': {
                                backgroundColor: '#1976d2',
                            },
                        }}>
                        Submit Review
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}
