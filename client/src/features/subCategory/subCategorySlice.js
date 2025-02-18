import {createSlice} from "@reduxjs/toolkit";

const initialState ={
    isLoading:false,
    allSubCategories:[]
}


const subCategorySlice = createSlice({
    name:'subCategory',
    initialState,
    reducers: {
        setLoading(state, action) {
            state.isLoading = action.payload;
        },
        setSubcategories(state, action) {
            state.allSubCategories = action.payload;
        },
        addSubcategory(state, action) {
            state.allSubCategories.push(action.payload);
        },
        updateSubcategory(state, action) {
            console.log(action.payload)
            const index = state.allSubCategories.findIndex(c => c._id === action.payload._id);
            console.log(index)
            if(index > -1) {
                state.allSubCategories[index] = action.payload;
            }
            else {
                console.error('Subcategory not found');
            }

        },
        deleteSubcategory(state, action) {
            const index = state.allSubCategories.findIndex(c => c._id === action.payload);
            if(index > -1) {
                state.allSubCategories.splice(index, 1);
            }
            else {
                console.error('Subcategory not found');
            }
        },
        clearSubcategories(state) {
            state.allSubCategories = [];
        }
    }
});

export const {
    setLoading,
    setSubcategories,
    addSubcategory,
    updateSubcategory,
    deleteSubcategory,
    clearSubcategories
} =subCategorySlice.actions;

export default subCategorySlice.reducer;

