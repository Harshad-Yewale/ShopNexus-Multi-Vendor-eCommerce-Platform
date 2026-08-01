const initialState = {
    analytics: null,
    sellers:[],
    sellerPagination:[],
    sellerApplications:[],
    applicationPagination:[],
    isLoading: false,
    errorMessage: null
};

export const AdminAnalyticsReducer = (state = initialState, action) => {
        switch(action.type){

           case "IS_ADMIN_FETCHING":
            return {
                ...state,
                isLoading: true,
                errorMessage: null,
            };

            case "FETCH_ADMIN_ANALYTICS":
              return {
                  ...state,
                  analytics:action.payload,
                   
              };          
            case "FETCH_ADMIN_SELLERS":
              return {
                  ...state,
                  sellers:action.payload,
                  sellerPagination: {
                    pageNumber: action.pageNumber,
                    pageSize: action.pageSize,
                    totalElements: action.totalElements,
                    totalPages: action.totalPages,
                    lastPage: action.lastPage,
                }
              };
            
            case "FETCH_ADMIN_SELLER_APPLICATIONS":
              return {
                  ...state,
                  sellerApplications:action.payload,
                  applicationPagination: {
                    pageNumber: action.pageNumber,
                    pageSize: action.pageSize,
                    totalElements: action.totalElements,
                    totalPages: action.totalPages,
                    lastPage: action.lastPage,
                }
              };

            case "IS_ADMIN_SUCCESS":
              return{
                ...state,
                isLoading:false,
                errorMessage:null
              }
            
            case "IS_ADMIN_ERROR":
              return{
                ...state,
                isLoading:false,
                errorMessage:action.payload
              }

              default:
                return state;

        }
}