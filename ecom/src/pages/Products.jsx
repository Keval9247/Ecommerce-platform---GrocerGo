import { Grid, Typography, Dialog } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ButtonC, Input } from '../components';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ROLES } from '../Roles/roles';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addproducts } from '../store/thunks/productThunk';
import { WidthFull } from '@mui/icons-material';

function Products() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.authReducer.isAuthenticated);
    const role = useSelector((state) => state.authReducer.role);
    const [products, setProducts] = useState(null);
    const [isavailable, setAvailable] = useState(false);
    const [view, setView] = useState(false);
    const [productname, setProductName] = useState('');
    const [productprice, setProductPrice] = useState('');
    const [productdescription, setProductDescription] = useState('');
    const [err, setErr] = useState('');

    const handleAddProduct = async () => {
        try {
            if (!products) {
                setErr("No file selected.");
                throw new Error("No file selected.");
            }

            const data = {
                category: products,
                name: productname,
                price: productprice,
                description: productdescription,
            };

            console.log("Data to send => ", data);

            const productVar = await dispatch(addproducts(data));
            console.log("productVar => ", productVar.meta.arg);

            toast.success(productVar.meta.arg.message);
            setView(true);
            setAvailable(false);
            setProducts(null);
        } catch (error) {
            console.error("Error adding product:", error);
            if (err) {
                toast.error(err);
            } else {
                toast.error('Failed to add product');
            }
        }
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            console.log("File selected:", file);
            setProducts(file);
            setAvailable(true);
        }
    };

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('*');
        } else if (role !== ROLES.ADMIN) {
            navigate('/');
        }
        return navigate('/admin/products');
    }, [isAuthenticated, role]);

    const handleBack = () => {
        navigate('/admin/');
    };

    return (
        <div>
            <h1>Welcome to Products page</h1>
            <Typography variant='h6'>Add Your Products:</Typography>
            <Grid
                container
                justifyContent='center'
                alignItems='center'
                display={'flex'}
                flexDirection={'column'}
                spacing={2}
                style={{ marginTop: '2rem' }}
            >
                <Grid item display={'flex'} flexDirection={'column'} gap={'1rem'} alignItems={'center'}>
                    <Grid item display={'flex'} flexDirection={'row'} gap={'1rem'} alignItems={'center'}>
                        <Input type='text' label='Enter Product Name' variant='outlined' value={productname} onChange={(e) => { setProductName(e.target.value) }} />
                        <Input type="number" label="Price" variant="outlined" value={productprice} onChange={(e) => setProductPrice(e.target.value)} inputProps={{ min: 0 }} style={{ width: '10rem' }} />
                    </Grid>
                    <Input type='text' label='Product Description' variant='outlined' rows={5} multiline value={productdescription} onChange={(e) => { setProductDescription(e.target.value) }} style={{ width: '25rem' }} />
                    <Input type='file' variant='outlined' onChange={handleFileUpload} />

                    <ButtonC onClick={handleAddProduct}>Upload</ButtonC>
                </Grid>

                <Grid item>
                    {isavailable && (
                        <ButtonC onClick={() => setView(true)}>View Product</ButtonC>
                    )}
                </Grid>

                {!isavailable && products && (
                    <Dialog open={view} onClose={() => setView(false)}>
                        <img
                            src={URL.createObjectURL(products)}
                            alt='Product'
                            style={{ width: '30rem', height: '25rem', margin: '2rem' }}
                        />
                    </Dialog>
                )}
            </Grid>

            <ButtonC
                onClick={handleBack}
                style={{
                    width: '13rem',
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    letterSpacing: '0.05rem',
                    textTransform: 'uppercase',
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
                    borderRadius: '8px',
                    marginTop: '2rem',
                    marginBottom: '2rem',
                    backgroundColor: '#a1aba3',
                }}
            >
                Back to Home
            </ButtonC>
            <ToastContainer autoClose={2000} />
        </div>
    );
}

export default Products;
