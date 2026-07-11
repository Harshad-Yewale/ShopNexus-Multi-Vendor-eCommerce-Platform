const initialState={
  adminOrder:[],
  pagination:[],
  sellerOrders:[],
  sellerPagination:[],
  isLoading:false,
  errorMessage:null
}

export const OrderReducer = (state = initialState, action) => {
 switch (action.type) {
        case "GET_ADMIN_ORDERS":
            return {
                ...state,
                adminOrder: action.payload,
                pagination: {
                    ...state.pagination,
                    pageNumber: action.pageNumber,
                    pageSize: action.pageSize,
                    totalElements: action.totalElements,
                    totalPages: action.totalPages,
                    lastPage: action.lastPage,
                },
            };
         case "GET_SELLER_ORDERS":
            return {
                ...state,
                sellerOrders: action.payload,
                sellerPagination: {
                    ...state.sellerPagination,
                    pageNumber: action.pageNumber,
                    pageSize: action.pageSize,
                    totalElements: action.totalElements,
                    totalPages: action.totalPages,
                    lastPage: action.lastPage,
                },
            };
        default:
            return state;
    }
}