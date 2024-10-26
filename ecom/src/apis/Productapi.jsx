import axios from "axios";
import { useEffect, useState } from "react";



const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    timeout: 5000,
    withCredentials: "include", // Include credentials in cross-origin requests
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const ListProducts = ({ ...props }) => {


    const fetchProducts = async (page) => {
        try {
            const token = localStorage.getItem('token')
            console.log("🚀 ~ fetchProducts ~ token:", token)
            console.log("Current Page: ", page);
            const response = await api.get(`${import.meta.env.VITE_BACKEND_URL}api/list-products?page=${page.page}&limit=${page.productsPerPage}`);
            console.log("Product API response:", response);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    };
    return fetchProducts({ ...props });

};

export const ListProductsWithoutParams = async () => {
    try {
        const response = await api.get(`${import.meta.env.VITE_BACKEND_URL}api/list-products`);
        console.log("Product API response without params:", response);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const ReadOneProduct = async (_id) => {
    try {
        // const_id = '668e0be852c73adc6cd2073e';
        const response = await api.get(`${import.meta.env.VITE_BACKEND_URL}api/product/${_id}`);
        console.log("Product API response:", response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const AddProducts = async (credentials) => {
    console.log("🚀 ~ AddProducts ~ credentials:", 12, credentials)
    try {
        const response = await api.post(`${import.meta.env.VITE_BACKEND_URL}api/addProduct`, credentials);
        console.log("Product API response:", response);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const CraetePayment = async (credentials) => {
    try {
        console.log("credentials payment api: ", credentials);
        const response = await api.post(`${import.meta.env.VITE_BACKEND_URL}api/create-payment`, credentials);
        console.log("Payment API response:", response); 
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const AddToCart = async (productId) => {
    try {
        console.log("🚀 ~ AddToCart ~ productId:", productId)
        const response = await api.post(`${import.meta.env.VITE_BACKEND_URL}api/cart/add`, productId);
        console.log("Cart API response:", response);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const GetCart = async () => {
    try {
        // console.log(1423);
        const response = await api.get(`${import.meta.env.VITE_BACKEND_URL}api/cart`);
        console.log("Cart API response:", response);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}


export const RemoveFromCart = async (productId) => {
    try {
        console.log("��� ~ RemoveFromCart ~ productId:", productId)
        const response = await api.delete(`${import.meta.env.VITE_BACKEND_URL}api/cart/remove`, { data: { productId } });
        console.log("Cart API response:", response);
        return response.data;
    } catch (error) {
        console.log("error : - ", error);
    }
}