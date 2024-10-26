import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ROLES } from '../Roles/roles';
import { 
  Grid, 
  Typography, 
  Card, 
  CardContent, 
  Box, 
  CircularProgress, 
  Pagination, 
  Tooltip, 
  FormControl, 
  MenuItem, 
  Select 
} from '@mui/material';
import { addToCart, fetchProducts } from '../store/thunks/productThunk';
import { ButtonC } from '../components';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

function ProductUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.authReducer.isAuthenticated);
  const products = useSelector((state) => state.productsReducer.products);
  console.log("🚀 ~ ProductUser ~ products:", products)
  const role = useSelector((state) => state.authReducer.role);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState('Relevant');
  const [page, setPage] = useState(1);
  const [cart, setCart] = useState([]);
  const [showDetail, setShowDetail] = useState(null);
  const rowsPerPage = 6;

  const isProductInCart = (productId) => cart.some((item) => item._id === productId);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('*');
    } else if (role !== ROLES.USER) {
      navigate('/');
    }
    return () => navigate('/user/products-list');
  }, [isAuthenticated, role, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await dispatch(fetchProducts({ page, productsPerPage: rowsPerPage }));
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [dispatch, page]);

  const handlePageChange = (event, newPage) => setPage(newPage);

  const AddToCart = async (product) => {
    try {
      const formData = new FormData();
      formData.append('productId', product._id);
      formData.append('category', product.category);
      formData.append('price', product.price);

      await dispatch(addToCart(formData));
      setCart((prevCart) => [...prevCart, product]);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleShowDetail = (product) => {
    setShowDetail(product);
  };

  const handleCloseDetail = () => {
    setShowDetail(null);
  };

  const getSortedProducts = () => {
    if (!products || !products.products || !Array.isArray(products.products)) {
      return [];
    }
    
    let sortedProducts = [...products.products];
    switch (sortBy) {
      case 'HighToLow':
        return sortedProducts.sort((a, b) => b.price - a.price);
      case 'LowToHigh':
        return sortedProducts.sort((a, b) => a.price - b.price);
      case 'A_Z':
        return sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
      case 'Z_A':
        return sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
      case 'Trending':
        return sortedProducts.sort((a, b) => b.trending - a.trending);
      case 'Relevant':
      default:
        return sortedProducts;
    }
  };

  const sortedProducts = getSortedProducts();
  const currentProducts = sortedProducts.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 3, margin: 7 }}>
      <Grid sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2,
        marginBottom: 2
      }}>
        <Typography variant='h3' mb={2}>Welcome to Product Page</Typography>
        <Typography variant='h6' mb={4}>All Products listed below:</Typography>
      </Grid>

      <Box sx={{ display: 'flex', flexDirection: 'column', mb: 4 }}>
        <Grid container spacing={2} sx={{ mb: 2, justifyContent: 'flex-end' }}>
          <Grid item>
            <Pagination
              count={Math.ceil((products?.products?.length || 0) / rowsPerPage)}
              page={page}
              onChange={handlePageChange}
              color='primary'
              variant='outlined'
              shape='rounded'
              showFirstButton
              showLastButton
              sx={{ display: 'flex', alignItems: 'center' }}
            />
          </Grid>
          <Grid item sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h6" color="#281f33">Sort by:</Typography>
            <FormControl variant='filled' sx={{ minWidth: 120 }}>
              <Select
                labelId='filled-select-label'
                id='filled-select'
                value={sortBy}
                onChange={handleSortChange}
                variant='filled'
                size='medium'
                sx={{ bgcolor: 'background.paper', borderRadius: '4px' }}
              >
                <MenuItem value='HighToLow'>Price (High To Low)</MenuItem>
                <MenuItem value='LowToHigh'>Price (Low To High)</MenuItem>
                <MenuItem value='A_Z'>A-Z</MenuItem>
                <MenuItem value='Z_A'>Z-A</MenuItem>
                <MenuItem value='Trending'>Trending</MenuItem>
                <MenuItem value='Relevant'>Relevant</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {currentProducts.length === 0 ? (
          <Typography variant='h6' mb={4}>No products found.</Typography>
        ) : (
          <Grid container spacing={3}>
            {currentProducts.map((product) => (
              <Grid item key={product._id} xs={12} sm={6} md={4} marginTop={2}>
                <Card sx={{ maxWidth: '28vw', height: '100%', display: 'flex', flexDirection: 'column', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)', transition: 'transform 0.3s ease-in-out', borderRadius: '8px', '&:hover': { transform: 'scale(1.02)' } }}>
                  <img src={`http://localhost:4000${product.category}`} alt={product.name} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px 8px 0 0' }} />
                  <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 2 }}>
                    <Grid sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                      <Grid sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography gutterBottom variant='h5'>{product.name}</Typography>
                        <Typography variant='body2' color='text.secondary'>{product.description}</Typography>
                        <Typography variant='body1' color='primary'>Price: ${product.price}</Typography>
                      </Grid>
                      <Grid>
                        <Tooltip title="Add to Cart">
                          <ButtonC
                            onClick={() => AddToCart(product)}
                            variant="contained"
                            sx={{ backgroundColor: '#EAE0FF', color: '#281f33', '&:hover': { backgroundColor: '#0d051f', color: '#fff' } }}
                          >
                            {!isProductInCart(product._id) ? <LibraryAddIcon /> : <CheckBoxIcon />}
                          </ButtonC>
                        </Tooltip>
                      </Grid>
                    </Grid>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, gap: '1rem' }}>
                      <ButtonC
                        variant='contained'
                        sx={{ backgroundColor: '#0d051f', '&:hover': { backgroundColor: '#EAE0FF', color: '#281f33' } }}
                        component={Link}
                        to={`/user/products-list/${product._id}`}
                      >
                        View more..
                      </ButtonC>
                      <ButtonC
                        variant='contained'
                        sx={{ backgroundColor: '#0d051f', '&:hover': { backgroundColor: '#EAE0FF', color: '#281f33' } }}
                        onClick={() => handleShowDetail(product)}
                      >
                        preview
                      </ButtonC>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Typography variant='h5'>
          Products showing {currentProducts.length} of {products?.products?.length || 0}...
        </Typography>
      </Box>
      {showDetail && (
        <Box sx={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          width: '50%',
          height: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          zIndex: 1200
        }}>
          <Typography variant='h4'>{showDetail.name}</Typography>
          <img src={`http://localhost:4000${showDetail.category}`} alt={showDetail.name} style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '8px', marginBottom: '1rem' }} />
          <Typography variant='h6' mb={1}>Price: ${showDetail.price}</Typography>
          <Typography variant='body1' mb={2}>{showDetail.description}</Typography>
          <ButtonC variant='contained' onClick={handleCloseDetail}>Close</ButtonC>
        </Box>
      )}
    </Box>
  );
}

export default ProductUser;