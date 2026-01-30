import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login, reset } from '../features/auth/authSlice';
import { 
    Container, Box, TextField, Button, Typography, Paper, Alert, CircularProgress 
} from '@mui/material';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (isError) {
            console.log("Login Error:", message);
        }

        if (isSuccess || (user && user.name)) {
            navigate('/'); 
        }

        return () => {
            dispatch(reset());
        };
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(login({ email, password }));
    };

    const isUserNotFound = message === 'User not found';

    return (
        <Container maxWidth="xs">
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Paper elevation={3} sx={{ p: 4, width: '100%', borderRadius: 2 }}>
                    <Typography component="h1" variant="h5" align="center" sx={{ mb: 3, fontWeight: 'bold', color: 'primary.main' }}>
                        Sign In
                    </Typography>

                    {isError && !isUserNotFound && (
                        <Alert severity="error" sx={{ mb: 2 }}>{message}</Alert>
                    )}

                    {isError && isUserNotFound && (
                        <Alert severity="info" sx={{ mb: 2 }}>
                            User does not exist.
                            <Button 
                                component={Link} 
                                to="/register" 
                                size="small" 
                                variant="outlined" 
                                color="primary" 
                                sx={{ display: 'block', mt: 1, textTransform: 'none' }}
                            >
                                Create Account
                            </Button>
                        </Alert>
                    )}

                    <Box component="form" onSubmit={onSubmit} noValidate>
                        <TextField
                            margin="normal" required fullWidth
                            id="email" label="Email Address" name="email"
                            autoComplete="email" autoFocus
                            value={email} onChange={onChange}
                        />
                        <TextField
                            margin="normal" required fullWidth
                            name="password" label="Password" type="password"
                            id="password" autoComplete="current-password"
                            value={password} onChange={onChange}
                        />
                        
                        <Button
                            type="submit" fullWidth variant="contained"
                            sx={{ mt: 3, mb: 2, py: 1.5 }} disabled={isLoading}
                        >
                            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
                        </Button>

                        <Box textAlign="center" sx={{ mt: 2 }}>
                            <Typography variant="body2">
                                Don't have an account?{' '}
                                <Link to="/register" style={{ textDecoration: 'none', color: '#0c831f', fontWeight: 'bold' }}>
                                    Register
                                </Link>
                            </Typography>
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
};

export default LoginPage;