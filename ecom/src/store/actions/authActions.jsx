// authActions.js

import { useDispatch } from 'react-redux';
import { login, signup, logout } from '../slice/AuthSlice';

let dispatch = useDispatch()

export const loginUser = async (credentials) => {
    try {
        console.log("creadentials: ", credentials);
        const result = await dispatch(login(credentials));
        console.log(111, result);
        return result.payload;
    } catch (error) {
        throw error;
    }
};

export const signupUser = async (userData) => {
    try {
        const result = await dispatch(signup(userData));
        return result.payload;
    } catch (error) {
        throw error;
    }
};

export const logoutUser = () => (dispatch) => {
    dispatch(logout());
};
