import api from "../../api/api";
import getErrorMessage from "../../components/ErrorMessages/getErrorMessage";

export const fetchProducts = (queryString = "") => async (dispatch) => {
    dispatch({ type: "IS_FETCHING" });

    try {
        const { data } = await api.get(`/public/products?${queryString}`);

        dispatch({
            type: "FETCH_PRODUCTS",
            payload: data.content,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements,
            totalPages: data.totalPages,
            lastPage: data.lastPage,
        });

        dispatch({
            type: "IS_SUCCESS",
        });
    } catch (error) {
        dispatch({
            type: "IS_ERROR",
            payload: getErrorMessage(error,"failed to fetch products")
        });
    }
};

export const fetchCategories = () => async (dispatch) => {
    dispatch({ type: "IS_FETCHING" });

    try {
        const { data } = await api.get("/public/categories");

        dispatch({
            type: "FETCH_CATEGORIES",
            payload: data.content,
        });

        dispatch({
            type: "IS_SUCCESS",
        });
    } catch (error) {
        dispatch({
            type: "IS_ERROR",
            payload:getErrorMessage(error, "Failed to fetch categories")
        });
    }
};

export const fetchCartProducts = () => async (dispatch, getState) => {
    dispatch({ type: "IS_FETCHING" });

    try {
        const cart = getState().cart.cart;

        if (!cart.length) {
            dispatch({
                type: "FETCH_CART_PRODUCTS",
                payload: [],
            });
            dispatch({type:"IS_SUCCESS"});
            return;
        }

        const ids = [... new Set(cart.map(item => item.productId))];

        const { data } = await api.post("/public/products/cart", ids);

        dispatch({
            type: "FETCH_CART_PRODUCTS",
            payload: data,
        });

        dispatch({ type: "IS_SUCCESS" });

    } catch (error) {
        dispatch({
            type: "IS_ERROR",
            payload: getErrorMessage(error, "Failed to load cart products"),
        });
    }
};

export const addToCart = (data, qty = 1, toast) => 
    (dispatch, getState) => {
        // Find the product
        const { products } = getState().products;
        const { cart } = getState().cart;
        const alreadyInCart = cart.some(
            (item) => item.productId === data.productId
        );

        if (alreadyInCart) {
            toast(`${data.productName} is already in the cart`, {
                icon: "⚠️",
            });
            return;
        }
        const getProduct = products.find(
            (item) => item.productId === data.productId
        );

        if (!getProduct) {
            toast.error("Product not found");
            return;
        }

        // Check for stocks
        const isQuantityExist = getProduct.productQuantity >= qty;

        // If in stock -> add
        if (isQuantityExist) {
            dispatch({ type: "ADD_CART", payload: {...data, quantity: qty}});
            toast.success(`${data?.productName} added to the cart`);
            localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
        } else {
            // error
            toast.error("Out of stock");
        }
    };

    export const increaseCartQuantity = 
    (data, toast, currentQuantity, setCurrentQuantity) =>
    (dispatch, getState) => {
        // Find the product
        const { cartProducts } = getState().products;

        const product = cartProducts.find(
            item => item.productId === data.productId
        );

        if (!product) {
            toast.error("Product not loaded");
            return;
        }
        const isQuantityExist = product.productQuantity >= currentQuantity + 1;

        if (isQuantityExist) {
            const newQuantity = currentQuantity + 1;
            setCurrentQuantity(newQuantity);

            dispatch({
                type: "ADD_CART",
                payload: {...data, quantity: newQuantity},
            });
            localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
        } else {
            toast.error("Quantity Reached to Limit");
        }

    };

    export const decreaseCartQuantity = 
    (data, newQuantity) => (dispatch, getState) => {
        dispatch({
            type: "ADD_CART",
            payload: {...data, quantity: newQuantity},
        });
        localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
    }

    export const removeFromCart =  (data, toast) => (dispatch, getState) => {
           dispatch({
                type: "REMOVE_CART",
                payload: data,
            });

            dispatch({
                type: "REMOVE_CART_PRODUCT",
                payload: data.productId,
            });

            toast.success(`${data.productName} removed from cart`);

            localStorage.setItem(
                "cartItems",
                JSON.stringify(getState().cart.cart)
            );
        };