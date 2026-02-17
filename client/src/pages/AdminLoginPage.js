import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, logoutAsync, reset } from '../features/auth/authSlice';
import { Container, Box, TextField, Button, Typography, Paper, Alert, CircularProgress } from '@mui/material';

const AdminLoginPage = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { email, password } = formData;
    
    const [accessError, setAccessError] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (isError) {
            console.error(message);
        }

        if (isSuccess && user) {
            if (user.isAdmin) {
                navigate('/admin/dashboard'); 
            } else {
                
                setAccessError("Access Denied.");
                dispatch(logoutAsync()); 
                dispatch(reset());
            }
        }
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        setAccessError(''); 
        dispatch(login({ email, password }));
    };

    return (
        <Container maxWidth="xs">
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Paper elevation={3} sx={{ p: 4, width: '100%', borderRadius: 2, borderTop: '4px solid #d32f2f' }}>
                    <Typography component="h1" variant="h5" align="center" sx={{ mb: 1, fontWeight: 'bold', color: '#d32f2f' }}>
                        Admin Portal
                    </Typography>
                   
                    {(isError || accessError) && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {accessError || message}
                        </Alert>
                    )}

                    <Box component="form" onSubmit={onSubmit} noValidate>
                        <TextField
                            margin="normal" required fullWidth
                            id="email" label="Admin Email" name="email"
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
                            type="submit" fullWidth variant="contained" color="error"
                            sx={{ mt: 3, mb: 2, py: 1.5 }} disabled={isLoading}
                        >
                            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Login to Dashboard'}
                        </Button>
                        
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
};

export default AdminLoginPage;