import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    addreseList:[]
};

const addressSlice = createSlice({
    name: "address",
    initialState,
    reducers: {
        addAddress: (state, action) => {
            state.addreseList = action.payload;
        }
        
    }
})

export const { addAddress } = addressSlice.actions;

export default addressSlice.reducer;