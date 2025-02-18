import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    orderList:[]
};

const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        handleOrders: (state, action) => {
            state.orderList = [...action.payload];
        }
        
    }
})

export const { handleOrders } = orderSlice.actions;

export default orderSlice.reducer;