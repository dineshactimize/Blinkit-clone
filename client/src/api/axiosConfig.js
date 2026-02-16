import axios from 'axios';

const API = axios.create({
    // Logic: If on localhost, use port 5000. If on Render, use the live URL.
    baseURL: window.location.hostname === 'localhost' 
        ? 'http://localhost:5000/api' 
        : 'https://blinkit-clone-qd0s.onrender.com/api',
});

API.interceptors.request.use((req) => {
    let token = null;

    // 1. Try getting token directly
    const storedToken = localStorage.getItem('token');
    
    // 2. Try getting token from user object (Redux persist style)
    const storedUser = localStorage.getItem('user');

    if (storedToken) {
        token = storedToken;
    } else if (storedUser) {
        try {
            const parsedUser = JSON.parse(storedUser);
            // Check if user object has token inside it
            if (parsedUser && parsedUser.token) {
                token = parsedUser.token;
            }
        } catch (error) {
            console.error("AXIOS: Error parsing user from localStorage", error);
        }
    }

    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    } 
    // Removed the "else warn" because it spams console on public requests (like getting products)

    return req;
});

export default API;