import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
    totalPrice: 0,
    finalPrice:0
}

const cartSlice = new createSlice({
    name: "cart",
    initialState,
    reducers: {
        addProductToCart: (state, action) => {
            state.cartItems.push(action.payload);
        },
        removeProductFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter((item) => item.id != action.payload);
        },
        increaseAmountOfProduct: (state, action) => {
            const cartItem = state.cartItems.find((item) => item.id == action.payload);
            cartItem.amount = cartItem.amount + 1;
         },
        decreaseAmountOfProduct: (state, action) => {
            const cartItem = state.cartItems.find((item) => item.id == action.payload);
            cartItem.amount = cartItem.amount - 1;
        },
        calculateTotalPrice: (state) => {
            let price = 0;
            for (let i = 0; i < state.cartItems.length; i++){
                let totalItemPrice = state.cartItems[i].price * state.cartItems[i].amount;
                price += totalItemPrice;
            }
            state.totalPrice = price;
        },
        totalMoneyToBePaid: (state, action) => {
            state.finalPrice = action.payload;  
        },
        clearCart: (state) => {
            state.cartItems = [];
            state.totalPrice = 0;
            state.finalPrice = 0;
        },

    }
});

export const {addProductToCart,removeProductFromCart,increaseAmountOfProduct,decreaseAmountOfProduct,calculateTotalPrice,totalMoneyToBePaid, clearCart } = cartSlice.actions;
export default cartSlice.reducer;