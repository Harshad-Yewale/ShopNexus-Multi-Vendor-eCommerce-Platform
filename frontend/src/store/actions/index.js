import { isAction } from "@reduxjs/toolkit";
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

export const fetchProductsForAdminAndSeller = (queryString = "",isAdmin) => async (dispatch) => {
    dispatch({ type: "IS_FETCHING" });

    try {
        if(isAdmin){
            const { data } = await api.get(`/admin/products?${queryString}`);

             dispatch({
                type: "FETCH_PRODUCTS",
                payload: data.content,
                pageNumber: data.pageNumber,
                pageSize: data.pageSize,
                totalElements: data.totalElements,
                totalPages: data.totalPages,
                lastPage: data.lastPage,
            });

        }
        else{
            const { data } = await api.get(`/seller/products?${queryString}`);
             dispatch({
                type: "FETCH_SELLER_PRODUCTS",
                payload: data.content,
                pageNumber: data.pageNumber,
                pageSize: data.pageSize,
                totalElements: data.totalElements,
                totalPages: data.totalPages,
                lastPage: data.lastPage,
            });
        }

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
            toast.error(getErrorMessage(error) || "Internal Server Error");
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
            toast.error(getErrorMessage(error) || error?.response?.data?.password || "Internal Server Error");
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
    dispatch({ type:"IS_FETCHING" });
    try {
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
        toast.error(getErrorMessage(error) || "Internal Server Error");
        dispatch({ type:"IS_ERROR", payload: null });
    } finally {
        setOpenAddressModal(false);
    }
};

export const getUserAddresses = () => async (dispatch, getState) => {
    try {
        dispatch({ type: "IS_FETCHING" });
        const { data } = await api.get(`/users/addresses`);
        dispatch({type: "USER_ADDRESS", payload: data});
        dispatch({ type: "IS_SUCCESS" });
    } catch (error) {
        console.log(error);
        dispatch({ 
            type: "IS_ERROR",
            payload: getErrorMessage(error) || "Failed to fetch user addresses",
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
            payload: getErrorMessage(error) || "Some Error Occured",
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
            payload: getErrorMessage(error) || "Failed to create cart items",
         });
    }
};

export const getUserCart = () => async (dispatch, getState) => {
    try {
        dispatch({ type: "IS_FETCHING" });
        const { data } = await api.get('/carts/users/cart');
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
            payload: getErrorMessage(error) || "Failed to fetch cart items",
         });
    }
};

export const clearUserCart = () => (dispatch) => {
    localStorage.removeItem("cartItems");
    dispatch({
        type: "CLEAR_CART",
    });
};
export const createPendingOrder = (addressId, toast) => async (dispatch) => {
    try {
        dispatch({ type: "IS_FETCHING" });

        const { data } = await api.post("/orders/create", { addressId,});
        dispatch({ type: "IS_SUCCESS" });
        return data;
    } catch (error) {
        dispatch({
            type: "IS_ERROR",
            payload: getErrorMessage(error, "Failed to create order"),
        });
        toast?.error(getErrorMessage(error, "Failed to create order"));
        return null;
    }
};

export const createRazorpayOrder = (orderId, toast) => async (dispatch) => {
    try {
        dispatch({ type: "IS_FETCHING" });
        const { data } = await api.post(`/payments/create-order/${orderId}`);
        dispatch({ type: "IS_SUCCESS" });
        return data;
    } catch (error) {
        dispatch({
            type: "IS_ERROR",
            payload: getErrorMessage(error, "Failed to create Razorpay order"),
        });
        toast?.error(
            getErrorMessage(error, "Failed to create Razorpay order")
        );
        return null;
    }
};

export const verifyPayment =
    (paymentData, toast) => async (dispatch) => {
        try {
            const { data } = await api.post("/payments/verify",paymentData );
            toast.success("Payment Verified Successfully");
            return data;

        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Payment verification failed."
            );
            return null;
        }
    };

    export const getAdminDashboardAnalytics = () => async (dispatch) => {
    try {

            dispatch({type: "IS_ADMIN_FETCHING",});

            const { data } = await api.get("/admin/dashboard/analytics");

            dispatch({
                type: "FETCH_ADMIN_ANALYTICS",
                payload: data,
            });
            dispatch({type:"IS_ADMIN_SUCCESS"})
        } catch (error) {

            dispatch({
                type: "IS_ADMIN_ERROR",
                payload:
                   getErrorMessage(error) || "Something went wrong",
            });
        }
};

export const getOrdersForDashboard = (queryString) => async (dispatch) => {
    try {
        dispatch({ type: "IS_FETCHING" });
        const { data } = await api.get(`/admin/orders?${queryString}`);
        dispatch({
            type: "GET_ADMIN_ORDERS",
            payload: data.content,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements,
            totalPages: data.totalPages,
            lastPage: data.lastPage,
        });
        dispatch({ type: "IS_SUCCESS" });
    } catch (error) {
        console.log(error);
        dispatch({ 
            type: "IS_ERROR",
            payload: getErrorMessage(error) || "Failed to fetch orders data",
         });
    }
};

export const updateOrderStatusFromDashboard =
     (orderId, orderStatus, toast, setLoader) => async (dispatch, getState) => {
    try {
        setLoader(true);
        const { data } = await api.put(`/admin/orders/${orderId}/status`, { status: orderStatus});
        toast.success(data.message || "Order updated successfully");
        await dispatch(getOrdersForDashboard());
    } catch (error) {
        toast.error(getErrorMessage(error) || "Internal Server Error");
    } finally {
        setLoader(false)
    }
};

export const updateProductFromDashboard = 
    (sendData, toast, reset, setLoader, setOpen, isOnlySeller) => async (dispatch) => {
    try {
        setLoader(true);
        if(isOnlySeller){
            await api.put(`/seller/product/${sendData.id}`, sendData);
        }
        else{
            await api.put(`/admin/product/${sendData.id}`, sendData);
        }
        
        toast.success("Product update successful");
        reset();
        setLoader(false);
        setOpen(false);
       dispatch(fetchProductsForAdminAndSeller(!isOnlySeller));
    } catch (error) {
        toast.error(getErrorMessage(error) || "Product update failed");
        setLoader(false)
     
    }
};
export const addProductFromDashboard = 
    (categoryId,sendData, toast, reset, setLoader, setOpen, isOnlySeller) => async (dispatch) => {
    try {
        setLoader(true);
        console.log(categoryId);
        if(isOnlySeller){
            await api.post(`/seller/categories/${categoryId}/product`, sendData);
        }
        else{
            await api.post(`/admin/categories/${categoryId}/product`, sendData);
        }
        
        toast.success("Product added successfully");
        reset();
        setLoader(false);
        setOpen(false);
        dispatch(fetchProductsForAdminAndSeller(!isOnlySeller));
    } catch (error) {
        toast.error(getErrorMessage(error)|| "add product failed");
        setLoader(false);
     
    }
};

export const deleteProduct = (setLoader, productId, toast, setOpenDeleteModal,isOnlySeller) => async (dispatch, getState) => {
    try {
        setLoader(true)
         if(isOnlySeller){
            await api.delete(`/seller/product/${productId}`);
        }
        else{
            await api.delete(`/admin/product/${productId}`);
        }
        toast.success("Product deleted successfully");
        setLoader(false)
        dispatch(fetchProductsForAdminAndSeller(!isOnlySeller));
        setOpenDeleteModal(false)
    } catch (error) {
        console.log(error);
        toast.error(getErrorMessage(error) || "Some Error Occured" )
        setLoader(false)
    }
};

export const updateProductImageFromDashboard =  (formData, productId, toast, setLoader, setOpen, isOnlySeller) => async (dispatch) => {
    try {
        setLoader(true);
        if(isOnlySeller){
            await api.put(`/seller/product/${productId}/upload`, formData);
        }
        else{
            await api.put(`/admin/product/${productId}/upload`, formData);
        }
        
        toast.success("Image upload successful");
        setLoader(false);
        setOpen(false);
        dispatch(fetchProductsForAdminAndSeller(!isOnlySeller));
    } catch (error) {
        toast.error(getErrorMessage(error) || "Product Image upload failed");
        setLoader(false)
     
    }
};


export const updateCategoryFromDashboard =  (formData, categoryId, toast, setLoader, setOpen) => async (dispatch) => {
    try {
        setLoader(true);
        await api.put(`/admin/categories/${categoryId}`, formData);
        toast.success("category updated successfully");
        setLoader(false);
        setOpen(false);
        await dispatch(fetchCategories());
    } catch (error) {
        toast.error(getErrorMessage(error) || "category update failed");
        setLoader(false)
     
    }
};

export const addCategoryFromDashboard =  (formData, toast, setLoader, setOpen) => async (dispatch) => {
    try {
        setLoader(true);
        await api.post("/admin/categories", formData);
        toast.success("category added successfully");
        setLoader(false);
        setOpen(false);
        await dispatch(fetchCategories());
    } catch (error) {
        toast.error(getErrorMessage(error) || "category added failed");
        setLoader(false)
     
    }
};

export const deleteCategory = (setLoader, categoryId, toast, setOpenDeleteModal) => async (dispatch, getState) => {
    try {
        setLoader(true)
        await api.delete(`/admin/categories/${categoryId}`);
        toast.success("Category deleted successfully");
        setLoader(false)
        await dispatch(fetchCategories());
        setOpenDeleteModal(false)
    } catch (error) {
        console.log(error);
        toast.error( getErrorMessage(error) || "Some Error Occured")
        setLoader(false)
    }
};


export const getSellersForDashboard = (queryString) => async (dispatch) => {
    try {
        dispatch({ type: "IS_ADMIN_FETCHING" });
        const { data } = await api.get("/auth/admin/sellers");
        dispatch({
            type: "FETCH_ADMIN_SELLERS",
            payload: data.content,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements,
            totalPages: data.totalPages,
            lastPage: data.lastPage,
        });
        dispatch({ type: "IS_ADMIN_SUCCESS" });
    } catch (error) {
        dispatch({ 
            type: "IS_ADMIN_ERROR",
            payload: getErrorMessage(error) || "Failed to fetch Sellers data",
         });
    }
};

export const addUserFromDashboard = 
    (sendData, toast, reset, setLoader, setOpen) => async (dispatch) => {
        const isSeller = sendData.role=="ROLE_SELLER"?"seller":"user";
    try {
        setLoader(true);
        await api.post("/auth/admin/add", sendData);
        toast.success(`${isSeller} added Successfully`);
        reset();
        setLoader(false);
        await dispatch(getSellersForDashboard());
        setOpen(false);
    } catch (error) {
        toast.error(getErrorMessage(error) || `${isSeller} add failed` );
        setLoader(false);
     
    }
};

export const updateUserFromDashboard = 
    (userId,sendData, toast, reset, setLoader, setOpen) => async (dispatch) => {
        const isSeller = sendData.role=="ROLE_SELLER"?"seller":"user";
    try {
        setLoader(true);
        await api.put(`/auth/admin/update/${userId}`, sendData);
        toast.success(`${isSeller}updated Successfully`);
        reset();
        setLoader(false);
        await dispatch(getSellersForDashboard());
        setOpen(false);
    } catch (error) {
        console.log(error)
        toast.error(getErrorMessage(error) || `${isSeller} update failed`);
        setLoader(false);
     
    }
};


export const getOrdersBySellerForDashboard = (queryString) => async (dispatch) => {
    try {
        dispatch({ type: "IS_FETCHING" });
        const { data } = await api.get(`/seller/orders?${queryString}`);
        dispatch({
            type: "GET_SELLER_ORDERS",
            payload: data.content,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements,
            totalPages: data.totalPages,
            lastPage: data.lastPage,
        });
        dispatch({ type: "IS_SUCCESS" });
    } catch (error) {
        console.log(error);
        dispatch({ 
            type: "IS_ERROR",
            payload: getErrorMessage(error) || "Failed to fetch orders data",
         });
    }
};

export const updateOrderStatusBySellerFromDashboard =
     (orderId, orderStatus, toast, setLoader) => async (dispatch, getState) => {
    try {
        setLoader(true);
        const { data } = await api.put(`/seller/orders/${orderId}/status`, { status: orderStatus});
        toast.success(data.message || "Order updated successfully");
        await dispatch(getOrdersBySellerForDashboard());
    } catch (error) {
        toast.error(getErrorMessage(error) || "Internal Server Error");
    } finally {
        setLoader(false)
    }
};





