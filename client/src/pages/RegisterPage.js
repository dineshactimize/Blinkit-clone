import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { register, reset } from '../features/auth/authSlice';
import { Container, Box, TextField, Button, Typography, Paper, Alert, CircularProgress } from '@mui/material';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const { name, email, password } = formData;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (isError) {
            console.error(message);
        }

        if (isSuccess || user) {
            navigate('/login'); 
        }

        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const userData = { name, email, password };
        dispatch(register(userData));
    };

    return (
        <Container maxWidth="xs">
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Paper elevation={3} sx={{ p: 4, width: '100%', borderRadius: 2 }}>
                    <Typography component="h1" variant="h5" align="center" sx={{ mb: 3, fontWeight: 'bold' }}>
                        Create Account
                    </Typography>

                    {isError && <Alert severity="error" sx={{ mb: 2 }}>{message}</Alert>}

                    <Box component="form" onSubmit={onSubmit}>
                        <TextField
                            margin="normal" required fullWidth
                            label="Full Name" name="name"
                            value={name} onChange={onChange}
                        />
                        <TextField
                            margin="normal" required fullWidth
                            label="Email Address" name="email"
                            value={email} onChange={onChange}
                        />
                        <TextField
                            margin="normal" required fullWidth
                            label="Password" name="password" type="password"
                            value={password} onChange={onChange}
                        />
                        
                        <Button
                            type="submit" fullWidth variant="contained"
                            sx={{ mt: 3, mb: 2 }} disabled={isLoading}
                        >
                            {isLoading ? <CircularProgress size={24} /> : 'Register'}
                        </Button>
                        
                        <Typography variant="body2" align="center">
                            Already have an account? <Link to="/login">Login</Link>
                        </Typography>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
};

export default RegisterPage;