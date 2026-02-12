import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api',
});

API.interceptors.request.use((req) => {
    let token = null;

    const storedToken = localStorage.getItem('token');

    const storedUser = localStorage.getItem('user');

    if (storedToken) {
        token = storedToken;
    } else if (storedUser) {
        try {
            const parsedUser = JSON.parse(storedUser);
            token = parsedUser.token;
        } catch (error) {
            console.error("AXIOS: Error parsing user from localStorage", error);
        }
    }

    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    } else {
        console.warn("AXIOS: No token found! Request will likely fail 401.");
    }

    return req;
});

export default API;