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