import {configureStore} from '@reduxjs/toolkit';
import userReducer from "../features/user/userSlice.js"
import categoryReducer from "../features/category/categorySlice.js"
import subCategoryReducer from "../features/subCategory/subCategorySlice.js"
import cartReducer from "../features/cart/cartSlice.js"
import addressReducer from "../features/address/addressSlice.js"
import orderReducer from "../features/order/orderSlice.js"
const store = configureStore({
    reducer: {
        user: userReducer,
        category:categoryReducer,
        subCategory: subCategoryReducer,
        cart: cartReducer, 
        address: addressReducer, 
        orders: orderReducer, 
    }
})
export default store;