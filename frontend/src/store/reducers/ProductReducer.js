const initialState = {
    products: null,
    categories: null,
    pagination: {},
    isLoading: false,
    errorMessage:null
};

export const productReducer = (state = initialState, action) => {
    switch (action.type) {

        case "IS_FETCHING":
            return {
                ...state,
                isLoading: true,
                errorMessage: null,
            };

        case "FETCH_PRODUCTS":
            return {
                ...state,
                isLoading: false,
                products: action.payload,
                pagination: {
                    pageNumber: action.pageNumber,
                    pageSize: action.pageSize,
                    totalElements: action.totalElements,
                    totalPages: action.totalPages,
                    lastPage: action.lastPage,
                },
                
                
            };

        case "FETCH_CATEGORIES":
            return {
                ...state,
                isLoading: false,
                categories: action.payload,
                 pagination: {
                    pageNumber: action.pageNumber,
                    pageSize: action.pageSize,
                    totalElements: action.totalElements,
                    totalPages: action.totalPages,
                    lastPage: action.lastPage,
                },
            };
        
        case "IS_SUCCESS":
            return {
                ...state,
                isLoading: false,
                errorMessage: null,
            };

        case "IS_ERROR":
            return {
                ...state,
                isLoading: false,
                errorMessage: action.payload,
            };

        default:
            return state;
    }
};