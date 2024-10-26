// authAPI.js

import axios from 'axios';


export const Login = async (credentials) => {
    try {
        console.log("credentials   : ", credentials);
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}api/login`, credentials);
        console.log("reposnse", response);
        return response.data;
    } catch (error) {
        throw error
    }
};

export const Signup = async (userData) => {
    console.log("🚀 ~ Signup ~ userData:", userData)
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}api/add`, userData);
        return response.data;
    } catch (error) {
        throw error
    }
};

export const ForgotPassword = async (email) => {
    console.log("🚀 ~ ForgotPassword ~ email:", email)
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}api/forgot-password`, email );
        return response;
    } catch (error) {
        throw error;
    }
};

