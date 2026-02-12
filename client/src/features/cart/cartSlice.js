import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import cartService from './cartService';
import { logout } from '../auth/authSlice';

const initialState = {
    cartItems: [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
    isCartLoaded: false,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
};

export const getCart = createAsyncThunk('cart/get', async (_, thunkAPI) => {
    try {
        return await cartService.getCart();
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message;
        return thunkAPI.rejectWithValue(message);
    }
});

export const syncCart = createAsyncThunk('cart/sync', async (cartData, thunkAPI) => {
    try {
        return await cartService.syncCart(cartData);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message;
        return thunkAPI.rejectWithValue(message);
    }
});

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            const index = state.cartItems.findIndex(
                (item) => item.product === action.payload._id || item._id === action.payload._id
            );

            if (index >= 0) {
                state.cartItems[index].cartQuantity =
                    (state.cartItems[index].cartQuantity || 1) + 1;
            } else {
                state.cartItems.push({
                    ...action.payload,
                    product: action.payload._id,
                    cartQuantity: 1
                });
            }
        },
        decreaseCart(state, action) {
            const index = state.cartItems.findIndex(
                (item) => item._id === action.payload._id
            );

            if (state.cartItems[index].cartQuantity > 1) {
                state.cartItems[index].cartQuantity -= 1;
            } else {
                state.cartItems = state.cartItems.filter(
                    (item) => item._id !== action.payload._id
                );
            }
        },
        clearCart(state) {
            state.cartItems = [];
            state.cartTotalQuantity = 0;
            state.cartTotalAmount = 0;
        },
        getTotals(state) {
            const { total, quantity } = state.cartItems.reduce(
                (acc, item) => {
                    acc.total += item.price * item.cartQuantity;
                    acc.quantity += item.cartQuantity;
                    return acc;
                },
                { total: 0, quantity: 0 }
            );

            state.cartTotalAmount = total;
            state.cartTotalQuantity = quantity;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCart.fulfilled, (state, action) => {
                state.isCartLoaded = true;
                if (action.payload?.items) {
                    state.cartItems = action.payload.items.map((item) => ({
                        ...item,
                        _id: item.product,
                        cartQuantity: item.quantity
                    }));
                }
            })
            .addCase(logout, (state) => {
                state.cartItems = [];
                state.cartTotalQuantity = 0;
                state.cartTotalAmount = 0;
                state.isCartLoaded = false;
            });
    }
});

export const { addToCart, decreaseCart, clearCart, getTotals } = cartSlice.actions;
export default cartSlice.reducer;
