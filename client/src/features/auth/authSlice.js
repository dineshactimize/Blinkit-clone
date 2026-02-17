import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api/axiosConfig';

const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
};

export const register = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
    try {
        const response = await API.post('/auth/register', userData);
        if (response.data) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message;
        return thunkAPI.rejectWithValue(message);
    }
});

export const login = createAsyncThunk('auth/login', async (userData, thunkAPI) => {
    try {
        const response = await API.post('/auth/login', userData);
        if (response.data) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message;
        return thunkAPI.rejectWithValue(message);
    }
});

export const logoutAsync = createAsyncThunk('auth/logoutAsync', async (_, thunkAPI) => {
    try {
        const subscription = JSON.parse(localStorage.getItem('pushSubscription'));
        if (subscription) {
            await API.post('/notifications/unsubscribe', subscription, {
                headers: { Authorization: `Bearer ${localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : ''}` }
            });
            localStorage.removeItem('pushSubscription');
        }
        localStorage.removeItem('user');
    } catch (error) {
        console.error('Logout error:', error);
        // Still proceed to logout even if unsubscribe fails
        localStorage.removeItem('pushSubscription');
        localStorage.removeItem('user');
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = '';
        },
        logout: (state) => {
            localStorage.removeItem('user');
            state.user = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
            .addCase(logoutAsync.fulfilled, (state) => {
                state.user = null;
            });
    }
});

export const { reset, logout } = authSlice.actions;
export { logoutAsync };
export default authSlice.reducer;