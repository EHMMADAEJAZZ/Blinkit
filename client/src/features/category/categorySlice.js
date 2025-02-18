import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    allCategories:[],
    isLoading:false,
};

const categoriesSlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        setLoading(state, action) {
            state.isLoading = action.payload;
        },
        addCategory: (state, action) => {
            state.allCategories.push(action.payload);
        },
        removeCategory: (state, action) => {
            state.allCategories = state.allCategories.filter(category => category._id!== action.payload);
        },
        updateCategory: (state, action) => {
            let updatedCategory = state.allCategories.find(category => category._id === action.payload._id);
            if(updatedCategory){
                updatedCategory.name = action.payload.name;
                updatedCategory._id = action.payload._id;
                updatedCategory.image = action.payload.image;
            }
           
           
        },
        setAllCategories: (state,action)=>{
            state.isLoading=true;
            state.allCategories = [...action.payload];
            state.isLoading=false;
        },
       
    }
})

export const { addCategory, removeCategory, updateCategory, setAllCategories } = categoriesSlice.actions;
export default categoriesSlice.reducer;