import React, { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { getCart, syncCart } from './features/cart/cartSlice';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CartPage from './pages/CartPage';
import CategoryPage from './pages/CategoryPage'; 

const theme = createTheme({
  palette: {
    primary: { main: '#0c831f' },
    secondary: { main: '#f8cb46' },
    background: { default: '#f5f5f5' }
  },
});

function App() {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          
          <Route path="/category/:slug" element={<CategoryPage />} />
          
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;