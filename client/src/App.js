import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

// IMPORTS
import HomePage from './pages/HomePage';       // <--- New Import
import Dashboard from './pages/Dashboard';     // <--- Admin Page
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

const theme = createTheme({
  palette: {
    primary: { main: '#0c831f' },
    secondary: { main: '#f8cb46' },
    background: { default: '#f5f5f5' }
  },
  typography: {
    fontFamily: 'Inter, Arial, sans-serif',
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* Public Home Page */}
          <Route path="/" element={<HomePage />} />
          
          {/* Admin Dashboard */}
          <Route path="/admin" element={<Dashboard />} />
          
          {/* Auth Pages */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;