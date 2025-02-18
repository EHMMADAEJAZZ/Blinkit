import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    cart:[],
    isLoading:false,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.isLoading = true;
            const item = action.payload;
            const existingItem = state.cart.find(i => i.id === item._id);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                state.cart.push({...item, quantity: 1 });
            }
            state.isLoading = false;
        },
        removeFromCart: (state, action) => {
            state.isLoading = true;
            const itemId = action.payload;
            state.cart = state.cart.filter(item => item.id!== itemId);
            state.isLoading = false;
        },
         setCart: (state,action)=>{
            state.isLoading=true;
            state.cart = [...action.payload];
            state.isLoading=false;
        },
        clearCart: (state) => {
            state.cart = [];
        },
    },
})
//get cart quantity
export const getCartQuantity = state => state.cart.cart.reduce((quantity, item) => quantity + item.quantity, 0);
//get total price   of cart
export const getTotalPrice = state => state.cart.cart.reduce((total, item) => parseInt(total) + item.productId.price * item.quantity, 0);
//get total discount
export const getTotalDiscount = state => state.cart.cart.reduce((total, item) => total + Math.ceil((item.productId.discount * item.productId.price)/100) * item.quantity, 0);
export const { addToCart, removeFromCart, setCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;