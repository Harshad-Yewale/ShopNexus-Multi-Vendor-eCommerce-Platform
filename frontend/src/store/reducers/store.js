import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./ProductReducer";
import { cartReducer } from "./CartReducer";


const cartItems = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];

const initialState = {
    cart: { cart: cartItems, totalPrice: 0, cartId: null },
};

export const store = configureStore({
    reducer: {
        products: productReducer,
        cart:cartReducer,
    },
    preloadedState: initialState,
});

export default store;