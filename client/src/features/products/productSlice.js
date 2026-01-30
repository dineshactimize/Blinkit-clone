import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api/axiosConfig';

export const createProduct = createAsyncThunk('products/create', async (productData, thunkAPI) => {
    try {
        const config = {
            headers: { 'Content-Type': 'multipart/form-data' },
        };
        const response = await API.post('/products', productData, config);
        return response.data;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message;
        return thunkAPI.rejectWithValue(message);
    }
});

export const getProducts = createAsyncThunk('products/getAll', async (_, thunkAPI) => {
    try {
        const response = await API.get('/products');
        return response.data;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message;
        return thunkAPI.rejectWithValue(message);
    }
});

const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: [],
        isLoading: false,
        isSuccess: false,
        isError: false,
        message: ''
    },
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.products.push(action.payload); 
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })

            .addCase(getProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.products = action.payload; 
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    }
});

export const { reset } = productSlice.actions;
export default productSlice.reducer;