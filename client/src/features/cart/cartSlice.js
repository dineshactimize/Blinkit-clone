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
        const message = (error.response && error.response.data && error.response.data.message) || error.message;
        return thunkAPI.rejectWithValue(message);
    }
});

export const syncCart = createAsyncThunk('cart/sync', async (cartData, thunkAPI) => {
    try {
        return await cartService.syncCart(cartData);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message;
        return thunkAPI.rejectWithValue(message);
    }
});

export const placeOrder = createAsyncThunk('cart/order', async (orderData, thunkAPI) => {
    try {
        return await cartService.createOrder(orderData);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message;
        return thunkAPI.rejectWithValue(message);
    }
});

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            const itemIndex = state.cartItems.findIndex((item) => item.product === action.payload._id || item._id === action.payload._id);
            
            if (itemIndex >= 0) {
                state.cartItems[itemIndex].cartQuantity += 1;
            } else {
                const tempProduct = { ...action.payload, product: action.payload._id, cartQuantity: 1 };
                state.cartItems.push(tempProduct);
            }
        },
        removeFromCart(state, action) {
            state.cartItems = state.cartItems.filter((cartItem) => cartItem._id !== action.payload._id);
        },
        decreaseCart(state, action) {
            const itemIndex = state.cartItems.findIndex((cartItem) => cartItem._id === action.payload._id);
            if (state.cartItems[itemIndex].cartQuantity > 1) {
                state.cartItems[itemIndex].cartQuantity -= 1;
            } else if (state.cartItems[itemIndex].cartQuantity === 1) {
                state.cartItems = state.cartItems.filter((cartItem) => cartItem._id !== action.payload._id);
            }
        },
        clearCart(state) {
            state.cartItems = [];
            state.cartTotalQuantity = 0;
            state.cartTotalAmount = 0;
        },
        getTotals(state) {
            let { total, quantity } = state.cartItems.reduce(
                (cartTotal, cartItem) => {
                    const { price, cartQuantity } = cartItem;
                    const itemTotal = price * cartQuantity;
                    cartTotal.total += itemTotal;
                    cartTotal.quantity += cartQuantity;
                    return cartTotal;
                },
                { total: 0, quantity: 0 }
            );
            state.cartTotalQuantity = quantity;
            state.cartTotalAmount = total;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isCartLoaded = true; 
                if (action.payload && action.payload.items) {
                    state.cartItems = action.payload.items.map(item => ({
                        ...item,
                        _id: item.product, 
                        cartQuantity: item.quantity
                    }));
                } else {
                    state.cartItems = [];
                }
            })
            .addCase(getCart.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isCartLoaded = true; 
                state.message = action.payload;
            })
            .addCase(logout, (state) => {
                state.cartItems = [];
                state.cartTotalQuantity = 0;
                state.cartTotalAmount = 0;
                state.isCartLoaded = false;
            })
            .addCase(placeOrder.fulfilled, (state) => {
                state.cartItems = [];
                state.cartTotalQuantity = 0;
                state.cartTotalAmount = 0;
            });
    }
});

export const { addToCart, removeFromCart, decreaseCart, clearCart, getTotals } = cartSlice.actions;
export default cartSlice.reducer;