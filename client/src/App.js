import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { getCart, syncCart } from './features/cart/cartSlice';
import axios from './api/axiosConfig'; 


import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CartPage from './pages/CartPage';
import CategoryPage from './pages/CategoryPage';
import OrdersPage from './pages/OrdersPage';
import Dashboard from './pages/Dashboard';       
import AdminLoginPage from './pages/AdminLoginPage'; 


const theme = createTheme({
  palette: {
    primary: { main: '#0c831f' },
    secondary: { main: '#f8cb46' },
    background: { default: '#f5f5f5' }
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    button: { textTransform: 'none', fontWeight: 600 }
  }
});

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems, cartTotalAmount, isCartLoaded } = useSelector((state) => state.cart);

  useEffect(() => {
    if (user) {
      dispatch(getCart());
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (user && isCartLoaded) {
        const cartData = {
            items: cartItems.map(item => ({
                product: item._id || item.product, 
                name: item.name,
                image: item.image,
                price: item.price,
                quantity: item.cartQuantity
            })),
            totalAmount: cartTotalAmount
        };
        dispatch(syncCart(cartData));
    }
  }, [cartItems, cartTotalAmount, isCartLoaded, user, dispatch]);

  useEffect(() => {
    if (user && 'serviceWorker' in navigator) {
        const registerPush = async () => {
            try {
                const register = await navigator.serviceWorker.register('/sw.js');

               
                const publicVapidKey = "BDjhi1ju78Ex6slj88rPsmr7c3ps_7ZOgVVEvfQn2D1IdIKUTgsQPk80w7rc5mqJawQFmt-bvkUGaYQEu2vhEwo"; 

                const subscription = await register.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
                });

                await axios.post('/notifications/subscribe', subscription, {
                    headers: { Authorization: `Bearer ${user.token}` }
                });
            } catch (error) {
                console.error("Push Error:", error);
            }
        };
        registerPush();
    }
}, [user]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="/cart" element={<CartPage />} />
          <Route path="/orders" element={user ? <OrdersPage /> : <Navigate to="/login" />} />
          
          <Route 
            path="/admin" 
            element={user && user.isAdmin ? <Navigate to="/admin/dashboard" /> : <AdminLoginPage />} 
          />

           <Route 
            path="/admin/dashboard" 
            element={user && user.isAdmin ? <Dashboard /> : <Navigate to="/admin" />} 
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;