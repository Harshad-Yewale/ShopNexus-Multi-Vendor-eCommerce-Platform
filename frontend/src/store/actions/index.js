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

export const authenticateSignInUser = (sendData, toast, reset, navigate, setLoader) => async (dispatch) => {
        try {
            setLoader(true);
            const { data } = await api.post("/auth/signin", sendData);
            dispatch({ type: "LOGIN_USER", payload: data });
            localStorage.setItem("auth", JSON.stringify(data));
            reset();
            toast.success("Login Success");
            navigate("/");
        } catch (error) {
            toast.error(error?.response?.data?.errors?.message || "Internal Server Error");
        } finally {
            setLoader(false);
        }
};

export const registerNewUser = (sendData, toast, reset, navigate, setLoader) => async (dispatch) => {
        try {
            setLoader(true);
            const { data } = await api.post("/auth/signup", sendData);
            reset();
            toast.success(data?.message || "User Registered Successfully");
            navigate("/login");
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.error?.message || error?.response?.data?.password || "Internal Server Error");
        } finally {
            setLoader(false);
        }
};

export const logOutUser = (navigate) => (dispatch) => {
    dispatch({ type:"LOG_OUT" });
    localStorage.removeItem("auth");
    navigate("/login");
};


export const addUpdateUserAddress =
     (sendData, toast, addressId, setOpenAddressModal) => async (dispatch, getState) => {
    // const { user } = getState().auth;
    dispatch({ type:"IS_FETCHING" });
    try {
        console.log(addressId);
       if (!addressId) {
            const { data } = await api.post("/addresses", sendData);
        } else {
            await api.put(`/addresses/${addressId}`, sendData);
        }
        dispatch(getUserAddresses());
        toast.success("Address saved successfully");
        dispatch({type:"IS_SUCCESS"});
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.error?.message || "Internal Server Error");
        dispatch({ type:"IS_ERROR", payload: null });
    } finally {
        setOpenAddressModal(false);
    }
};

export const getUserAddresses = () => async (dispatch, getState) => {
    try {
        dispatch({ type: "IS_FETCHING" });
        const { data } = await api.get(`/addresses`);
        dispatch({type: "USER_ADDRESS", payload: data});
        dispatch({ type: "IS_SUCCESS" });
    } catch (error) {
        console.log(error);
        dispatch({ 
            type: "IS_ERROR",
            payload: error?.response?.error?.message || "Failed to fetch user addresses",
         });
    }
};

export const selectUserCheckoutAddress = (address) => {
    return {
        type: "SELECT_CHECKOUT_ADDRESS",
        payload: address,
    }
};


export const deleteUserAddress = 
    (toast, addressId, setOpenDeleteModal) => async (dispatch, getState) => {
    try {
        dispatch({ type: "IS_LOADING" });
        await api.delete(`/addresses/${addressId}`);
        dispatch({ type: "IS_SUCCESS" });
        dispatch(getUserAddresses());
        dispatch(clearCheckoutAddress());
        toast.success("Address deleted successfully");
    } catch (error) {
        console.log(error);
        dispatch({ 
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Some Error Occured",
         });
    } finally {
        setOpenDeleteModal(false);
    }
};

export const clearCheckoutAddress = () => {
    return {
        type: "REMOVE_CHECKOUT_ADDRESS",
    }
};

export const addPaymentMethod = (method) => {
    return {
        type: "ADD_PAYMENT_METHOD",
        payload: method,
    }
};

export const createUserCart = (sendCartItems) => async (dispatch, getState) => {
    try {
        dispatch({ type: "IS_FETCHING" });
        await api.post('carts/cart/create', sendCartItems);
        await dispatch(getUserCart());
    } catch (error) {
        console.log(error);
        dispatch({ 
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to create cart items",
         });
    }
};

export const getUserCart = () => async (dispatch, getState) => {
    try {
        dispatch({ type: "IS_FETCHING" });
        const { data } = await api.get('/carts/users/cart');
        console.log(data);
        dispatch({
            type: "GET_USER_CART_PRODUCTS",
            payload: data.productDTOs,
            totalPrice: data.totalPrice,
            cartId: data.cartId
        })
        localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
        dispatch({ type: "IS_SUCCESS" });
    } catch (error) {
        console.log(error);
        dispatch({ 
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to fetch cart items",
         });
    }
};