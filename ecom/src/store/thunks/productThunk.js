import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AddProducts, CraetePayment, ListProducts, ReadOneProduct, ListProductsWithoutParams, AddToCart, GetCart, RemoveFromCart } from "../../apis/Productapi";

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async ({ ...props }) => {
        try {
            // console.log("props : ", { ...props });
            const response = await ListProducts({ ...props });
            console.log("product list from thunk : ", response);
            if (!response) {
                throw new Error("Can't find products")
            }
            return response;
        } catch (error) {
            console.log("Error : ", error);
            throw error;
        }
    }
)

export const fetchProductsWithoutParams = createAsyncThunk(
    'products/fetchProductsWithoutParams',
    async () => {
        try {
            const response = await ListProductsWithoutParams();
            console.log("Product list from thunk without params : ", response);
            if (!response) {
                throw new Error("Can't find products")
            }
            return response;
        } catch (error) {
            console.log("Error : ", error);
            throw error;
        }
    }
)

export const readoneProduct = createAsyncThunk(
    'products/readoneProduct',
    async (_id) => {
        try {
            const response = await ReadOneProduct(_id);
            console.log("Product from thunk : ", response.user);
            if (!response) {
                throw new Error("Can't find product")
            }
            return response.user;
        } catch (error) {
            console.log("Error : ", error);
            throw error;
        }
    }
)
export const addproducts = createAsyncThunk(
    'products/addProducts',
    async (credentials) => {
        try {
            console.log("🚀 ~ credentials:", credentials)
            const response = await AddProducts(credentials);
            console.log("Product added successfully : ", response);
            return response;
        } catch (error) {
            console.log("Error : ", error);
            throw error;
        }
    }
)

export const createPayment = createAsyncThunk(
    'products/createPayment',
    async (credentials) => {
        try {
            console.log("credentials payment : ", credentials);
            const response = await CraetePayment(credentials);
            // console.log("Payment response from thunk : ", response);
            if (!response) {
                throw new Error("Can't find payment")
            }
            return response;
        } catch (error) {
            console.log("Error : ", error);
            throw error;
        }
    }
)

export const addToCart = createAsyncThunk(
    'products/addToCart',
    async (formdata) => {
        try {
            console.log("🚀 ~ productId:", formdata)
            const response = await AddToCart(formdata)
            console.log("Cart API response:", response);
            return response;
        } catch (error) {
            console.log(error);
        }
    }
)

// console.log("🚀 ~ addToCart:", addToCart)
export const getCart = createAsyncThunk(
    'products/getCart',
    async () => {
        try {
            console.log(123123);
            const response = await GetCart();
            console.log("Cart API response:", response);
            return response;
        } catch (error) {
            console.log(error);
        }
    }
)

export const removeCartItem = createAsyncThunk(
    'products/removeCartItem',
    async ( data ) => {
        try {
            console.log(122223);
            console.log("��� ~ productId from thunk :", data)
            const response = await RemoveFromCart(data)
            console.log("Cart API response:", response);
            return response;
        } catch (error) {
            console.log(error);
        }
    }
)