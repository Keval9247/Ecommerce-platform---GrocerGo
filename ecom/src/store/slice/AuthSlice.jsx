import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { forgetPassword, login, signup } from "../thunks/authThunks";

const initialState = {
    isAuthenticated: false,
    user: null,
    role: null,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        /*Actions */
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.role = null; /*clear on logout */
            state.error = null;
            localStorage.removeItem('token');
        },
        clearAuthentication(state) {
            state.isAuthenticated = false;
            state.user = null;
            state.role = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.user = action.payload;
                state.role = action.payload.role;
                state.error = null;
            },)
            .addCase(login.rejected, (state, action) => {
                state.isAuthenticated = false;
                state.user = null;
                state.role = null;
                state.error = action.payload ? action.payload.error : 'Login failed';;
            },)
            .addCase(signup.fulfilled, (state, action) => {
                state.isAuthenticated = false;
                state.user = action.payload;
                state.role = action.payload.role;
                state.error = null;
            },)
            .addCase(signup.rejected, (state, action) => {
                state.isAuthenticated = false;
                state.user = null;
                state.role = null;
                state.error = action.payload ? action.payload.error : 'Sign up failed';;
            },)
            .addCase(forgetPassword.pending, (state, action) => {
                state.user = null
                state.error = null;
            })
            .addCase(forgetPassword.fulfilled, (state, action) => {
                console.log("🚀 ~ .addCase ~ action:", action)
                state.user = action.payload;
                state.error = null;
            })
            .addCase(forgetPassword.rejected, (state, action) => {
                state.error = action.payload ? action.payload.error : 'Failed to send reset email';
                state.user = null;
            })
    },
})


export const { logout, clearAuthentication } = authSlice.actions;
export default authSlice.reducer;