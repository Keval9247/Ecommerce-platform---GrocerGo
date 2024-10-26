import { createSlice } from '@reduxjs/toolkit';
import { addproducts, fetchProducts, createPayment, readoneProduct, fetchProductsWithoutParams, addToCart, getCart, removeCartItem } from '../thunks/productThunk';

const initialState = {
    products: [],
    cart: [],
    allproducts: [],
    loading: false,
    error: null,
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductsWithoutParams.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductsWithoutParams.fulfilled, (state, action) => {
                console.log("🚀 ~ .addCase ~ action:", action)
                state.loading = false;
                state.error = null;
                state.products = action.payload;
            })
            .addCase(fetchProductsWithoutParams.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchProducts.pending, (state) => {
                // state.products = [];
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                console.log("🚀 ~ .addCase ~ action:", action)
                state.loading = false;
                state.allproducts = action.payload.products;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addproducts.pending, (state, action) => {
                state.loading = true;
                state.error = null;
                // state.products = [];
            })
            .addCase(addproducts.fulfilled, (state, action) => {
                console.log("action : ", action);
                state.loading = false;
                state.products = action.meta.arg;
                state.error = null;
            })
            .addCase(addproducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(createPayment.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createPayment.fulfilled, (state, action) => {
                console.log("Actions from product slice :", action);
                state.loading = false;
                state.error = null;
            })
            .addCase(createPayment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(readoneProduct.pending, (state, action) => {
                state.loading = true;
                state.error = null;
                state.products = null;
            })
            .addCase(readoneProduct.fulfilled, (state, action) => {
                console.log("🚀 ~ .addCase ~ state:", state)
                console.log("Actions from product slice :", action);
                
                state.loading = false;
                state.error = null;
                state.products = action.payload;
            })
            .addCase(readoneProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                state.products = null;
            })
            .addCase(addToCart.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                console.log("🚀 ~ .addCase ~ action:", action)
                console.log("🚀 ~ .addCase ~ state:", state)
                state.loading = false;
                state.error = null;
                state.cart = action.payload;
                // console.log("🚀 ~ .addCase ~ [...state.cart, action.payload]:", [...cart, action.payload])
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(getCart.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCart.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.cart = action.payload;
            })
            .addCase(getCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(removeCartItem.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeCartItem.fulfilled, (state, action) => {
                console.log("��� ~.addCase ~ action:", action)
                console.log("��� ~.addCase ~ state:", state)
                state.loading = false;
                state.error = null;
                state.cart = action.payload.cart
            })
            .addCase(removeCartItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            ;
    },
});

export default productsSlice.reducer;
