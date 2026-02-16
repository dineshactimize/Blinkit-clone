import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axiosConfig'; 

const initialState = {
    products: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ''
};

export const getProducts = createAsyncThunk('products/getAll', async (_, thunkAPI) => {
    try {
        const response = await axios.get('/products');
        return response.data;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message;
        return thunkAPI.rejectWithValue(message);
    }
});

export const createProduct = createAsyncThunk('products/create', async (productData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response = await axios.post('/products', productData, config);
        return response.data;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message;
        return thunkAPI.rejectWithValue(message);
    }
});

export const deleteProduct = createAsyncThunk('products/delete', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        const config = { headers: { Authorization: `Bearer ${token}` } };
        await axios.delete(`/products/${id}`, config);
        return id; 
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message;
        return thunkAPI.rejectWithValue(message);
    }
});

export const updateProduct = createAsyncThunk('products/update', async ({ id, productData }, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response = await axios.put(`/products/${id}`, productData, config);
        return response.data;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message;
        return thunkAPI.rejectWithValue(message);
    }
});

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = '';
        },
    },
    extraReducers: (builder) => {
        builder
.addCase(getProducts.fulfilled, (state, action) => {
    state.isLoading = false;

    // ✅ handle ALL backend formats safely
    if (Array.isArray(action.payload)) {
        state.products = action.payload;
    } else if (Array.isArray(action.payload.products)) {
        state.products = action.payload.products;
    } else {
        state.products = [];
    }
})



            .addCase(createProduct.fulfilled, (state, action) => {
                state.products.push(action.payload);
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.products = state.products.filter((product) => product._id !== action.payload);
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                const index = state.products.findIndex((product) => product._id === action.payload._id);
                if (index !== -1) {
                    state.products[index] = action.payload;
                }
            });
    },
});

export const { reset } = productSlice.actions;
export default productSlice.reducer;