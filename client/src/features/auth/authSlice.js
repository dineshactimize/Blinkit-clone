import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api/axiosConfig';

export const register = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
    try {
        const response = await API.post('/auth/register', userData);
        if (response.data) {
            localStorage.setItem('token', response.data.token);
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
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    } catch (error) {
        
        const message = (error.response && error.response.data && error.response.data.message) || error.message;
        return thunkAPI.rejectWithValue(message);
    }
});


const userToken = localStorage.getItem('token');

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: userToken ? { token: userToken } : null, 
        isError: false,
        isSuccess: false,
        isLoading: false,
        message: ''
    },
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = '';
        },
        logout: (state) => {
            localStorage.removeItem('token');
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
            });
    }
});

export const { reset, logout } = authSlice.actions;
export default authSlice.reducer;