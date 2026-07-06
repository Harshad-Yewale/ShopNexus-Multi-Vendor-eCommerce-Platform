const initialState = {
    analytics: null,
    isLoading: false,
    errorMessage: null
};

export const AdminAnalyticsReducer = (state = initialState, action) => {
        switch(action.type){

           case "IS_ANALYTICS_FETCHING":
            return {
                ...state,
                isLoading: true,
                errorMessage: null,
            };

            case "IS_ANALYTICS_SUCCESS":
              return {
                  ...state,
                  analytics:action.payload,
                  isLoading: false,
                  errorMessage: null,
              };
            
            case "IS_ANALYTICS_ERROR":
              return{
                ...state,
                isLoading:false,
                errorMessage:action.payload
              }
              default:
                return state;

        }
}