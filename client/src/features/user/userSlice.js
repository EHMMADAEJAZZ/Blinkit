import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    userDetails: null,
    loading: false,
    error: null,
    isAuthenticated: false,
    // Add any other necessary state properties here

}
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        fetchUserDetailsStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchUserDetailsSuccess: (state, action) => {
            state.loading = true;
            state.userDetails = action.payload;
            state.isAuthenticated = true;
            state.loading = false;
        },
        fetchUserDetailsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        login: (state, action) => {
            state.loading = true;
            state.userDetails = action.payload;
            state.isAuthenticated = true;
            state.loading = false;
        },
        logout: (state) => {
            state.userDetails = null;
            state.isAuthenticated = false;
        }
        // Add other reducer functions as needed
        
    }
});

export const {fetchUserDetailsStart, fetchUserDetailsSuccess, fetchUserDetailsFailure,login, logout} = userSlice.actions;
export default userSlice.reducer;