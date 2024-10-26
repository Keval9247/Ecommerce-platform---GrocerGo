import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, Box, Button, Card, CardContent, CircularProgress } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import backgroundImage from '../../../icons/Background.gif';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/system';
import { fetchProductsWithoutParams } from '../../store/thunks/productThunk';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StyledButton = styled(Button)(({ theme }) => ({
  padding: '10px 20px',
  fontWeight: 'bold',
  borderRadius: '25px',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s ease',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '1rem',
  backgroundColor: '#e0def2',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
  },
}));

const Layout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector(state => state.productsReducer.products);
  console.log("🚀 ~ Layout ~ products:", products)
  const isAuthenticated = useSelector(state => state.authReducer.isAuthenticated);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  console.log("🚀 ~ Layout ~ displayedProducts:", displayedProducts)
  const [loading, setLoading] = useState(false);
  console.log("🚀 ~ Layout ~ loading:", loading)
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await dispatch(fetchProductsWithoutParams());
      console.log("🚀 ~ fetchProducts ~ response:", response)
      if (response.payload && Array.isArray(response.payload.products)) {
        setDisplayedProducts(response.payload?.products.slice(0, 5)); // Set initial products
      }
    };

    fetchProducts();
  }, [dispatch]);

  const handleViewDetails = () => {
    if (!isAuthenticated) {
      toast.error('Please Login to view Product Details', {
        autoClose: 3000,
        onClose: () => navigate('/login')
      });
    } else {
      // Handle navigation to product details for authenticated users
    }
  };

  const handleLoadMore = () => {
    setCurrentPage(prevPage => prevPage + 1);
    setDisplayedProducts(products?.products.slice(0, (currentPage + 1) * 5)); // Load more products
    toast.success("Products has been loaded...");
    setLoading(true);
  };

  const features = [
    { title: 'Secure Authentication', description: 'State-of-the-art security protocols to keep your data safe.' },
    { title: 'User-Friendly Interface', description: 'Intuitive design for seamless navigation and interaction.' },
    { title: 'Cross-Platform Compatibility', description: 'Access your account from any device, anywhere.' },
  ];

  return (
    <>
      <div style={{
        backgroundColor: '#EAE0FF',
      }}>
        <ToastContainer position='top-right' autoClose={2000} />
        <Container sx={{ py: 8 }}>
          <Grid container spacing={6} alignItems="center" justifyContent="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
                Welcome to Auth App
              </Typography>
              <Typography variant="h5" paragraph sx={{ color: '#666', mb: 4 }}>
                Secure, Simple, and Seamless Authentication for Your Digital World
              </Typography>
              <Grid container spacing={2} alignContent={'center'} justifyContent={'center'}>
                <Grid item>
                  <StyledButton
                    variant="contained"
                    sx={{
                      backgroundColor: 'rgba(135, 32, 46, 1)',
                      '&:hover': {
                        backgroundColor: 'rgba(135, 32, 46, 0.85)',
                        color: 'rgba(135,32,46)'
                      },
                    }}
                    component={Link}
                    to="/login"
                  >
                    Login
                  </StyledButton>
                </Grid>
                <Grid item>
                  <StyledButton
                    variant="contained"
                    sx={{
                      backgroundColor: 'rgba(21, 51, 37, 1)',
                      '&:hover': {
                        backgroundColor: 'rgba(21, 51, 37, 0.85)',
                        color: 'rgba(21,51,37)'
                      },
                    }}
                    component={Link}
                    to="/signup"
                  >
                    Sign Up
                  </StyledButton>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box position="relative" sx={{ borderRadius: '10px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)' }}>
                <img src={backgroundImage} alt="Background" style={{ width: '100%', height: 'auto', opacity: 0.9 }} />
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    textAlign: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    padding: '30px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <Typography variant="h4" sx={{ marginBottom: '10px', fontWeight: 'bold', color: '#333' }}>
                    Empower Your Digital Identity
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#666' }}>
                    Experience the future of secure authentication with Auth App.
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mt: 8, mb: 6, fontWeight: 'bold', color: '#333' }}>
                Why Choose Auth App?
                <span style={{
                  position: "absolute",
                  left: "50%",
                  transform: "translatex(-50%)",
                  width: "20rem",
                  height: "3px",
                  background: "#b4a5d9",
                  display: "block",
                }} />
              </Typography>
              <Grid container spacing={4}>
                {features.map((feature, index) => (
                  <Grid item xs={12} md={4} key={index}>
                    <FeatureCard>
                      <CardContent>
                        <Typography variant="h5" component="div" gutterBottom sx={{ fontWeight: 'bold', color: '#444' }}>
                          {feature.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {feature.description}
                        </Typography>
                      </CardContent>
                    </FeatureCard>
                  </Grid>
                ))}
              </Grid>

              <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mt: 8, mb: 4, fontWeight: 'bold', color: '#333' }}>
                Our Latest Products
                <span style={{
                  position: "absolute",
                  left: "50%",
                  transform: "translatex(-50%)",
                  width: "15rem",
                  height: "3px",
                  background: "#b4a5d9",
                  display: "block",
                }} />
              </Typography>
              <Grid container spacing={4}>
                {displayedProducts.map((item, index) => (
                  <Grid item xs={12} md={4} key={index}>
                    <FeatureCard>
                      <CardContent sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        height: 'auto',
                        gap: '1rem',
                      }}>
                        <img src={`http://localhost:4000${item.category}`} alt={item.name} />
                        <Typography variant="h5" component="div" gutterBottom sx={{ fontWeight: 'bold', color: '#444' }}>
                          {item.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.description}
                        </Typography>
                        <Typography variant="body2" color="#0d051f">
                          ${item.price}
                        </Typography>
                        <Button variant="contained" sx={{ backgroundColor: '#0d051f', flexGrow: 1 }} component={Link}
                          to={'/login'}
                          onClick={handleViewDetails}>
                          View Details
                        </Button>
                        <Typography variant='caption' color="red" gutterBottom>
                          (*please login first to view full products details)
                        </Typography>
                      </CardContent>
                    </FeatureCard>
                  </Grid>
                ))}
              </Grid>

              <Box textAlign="center" mt={4}>
                {displayedProducts !== products && !loading && (
                  <div>
                    <Button variant="contained" sx={{ backgroundColor: '#0d051f', flexGrow: 1 }} onClick={handleLoadMore}>
                      Load More..
                    </Button>
                  </div>
                )}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
};

export default Layout;
