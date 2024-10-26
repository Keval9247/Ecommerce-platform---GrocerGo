// App.js

import './App.css';
import React, { createContext, useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AdminLayout from './layout/adminlayout/layout';
import UserLayout from './layout/userlayout/layout';
import Home from './pages/Home';
import Products from './pages/Products';
import Solution from './pages/Solution';
import Authority from './pages/Authority';
import Services from './pages/Services';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProtectedRoute from './Middleware/ProtetcedRoute';
import ErrorPage from './pages/ErorrPage';
import { ROLES } from './Roles/roles';
import Layout from './layout/Home/Layout';
import Home1 from './pages/Home1';
import Home2 from './pages/Home2';
import Home3 from './pages/Home3';
import { About } from './components';
import Contact from './pages/Contact';
import ProductUser from './pages/ProductUser';
import Payment from './pages/Payment';
import ProductsDetails from './pages/ProductsDetails';
import Cart from './pages/Cart';
import PaymentSuccessPage from './pages/PaymentSuccessPage';
import ContactUs from './pages/ContactUs';
import ForgotPassword from './pages/ForgotPassword';

export const CartContent = createContext()

function App() {
  const isAuthenticated = useSelector((state) => state.authReducer.isAuthenticated);
  const role = useSelector((state) => state.authReducer.role);
  const navigate = useNavigate();
  const [cartdata, setCartData] = useState()

  useEffect(() => {
    // console.log(isAuthenticated);
    if (isAuthenticated) {
      if (role === ROLES.ADMIN) {
        navigate('/admin');
      } else if (role === ROLES.USER) {
        navigate('/user');
      }
    }
  }, [isAuthenticated, role, navigate]);

  return (
    <>
      {/* <CartContent.Provider value={{ cartdata, setCartData }}> */}
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/forgot-password' element={<ForgotPassword/>}/>

        <Route path="/admin" element={<ProtectedRoute allowedRoles={[ROLES.ADMIN]} />}>
          <Route element={<AdminLayout />}>
            <Route index element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route path="solution" element={<Solution />} />
          </Route>
        </Route>
    
        <Route path="/user" element={<ProtectedRoute allowedRoles={[ROLES.USER]} />}>
          <Route element={<UserLayout />}>
            {/* Nested routes for Home */}
            <Route index element={<Home />} />
            <Route path="home1" element={<Home1 />} />
            <Route path="home2" element={<Home2 />} />
            <Route path="home3" element={<Home3 />} />
            <Route path='about' element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="products-list" element={<ProductUser />} />
            <Route path="products-list/:_id" element={<ProductsDetails />} />
            <Route path="services" element={<Services />} />
            <Route path="authority" element={<Authority />} />
            <Route path='payment/:_id' element={<Payment />} />
            <Route path='payment/success' element={<PaymentSuccessPage />} />
            <Route path='cart' element={<Cart />} />
            {/* <Route path='contact-us' element={<ContactUs />} /> */}
          </Route>
        </Route>

        <Route path="*" element={<ErrorPage />} />
      </Routes>
      {/* </CartContent.Provider> */}
    </>
  );
}

export default App;