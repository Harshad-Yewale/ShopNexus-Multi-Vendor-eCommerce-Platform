import api from "../../api/api"

export const fetchProducts = (queryString) => async (dispatch) => {
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
        })
    } catch (error) {
        console.log(error);
    }
};