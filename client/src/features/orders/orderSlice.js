import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/axiosConfig";

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async () => {
    const res = await API.get("/orders");
    return res.data;
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState: { orders: [] },
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
    });
  }
});

export default orderSlice.reducer;

