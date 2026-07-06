import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./ProductReducer";
import { cartReducer } from "./CartReducer";
import { authReducer } from "./AuthReducer";
import { PaymentMethodReducer } from "./PaymentMethodReducer";
import { AdminAnalyticsReducer } from "./AdminAnalyticsReducer";
import { OrderReducer } from "./OrderReducer";

const user = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : null;

const cartItems = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];

const initialState = {
     auth: { user: user },
     cart: { cart: cartItems, totalPrice: 0, cartId: null },
};

export const store = configureStore({
    reducer: {
        products: productReducer,
        cart: cartReducer,
        auth: authReducer,
        payment: PaymentMethodReducer,
        adminAnalytics: AdminAnalyticsReducer,
        orders: OrderReducer,
    },
    preloadedState: initialState,
});

export default store;