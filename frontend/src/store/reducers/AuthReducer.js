const initialState = {
    user: null,
    address: [],
    selectedUserCheckoutAddress: null,
    isLoading:false,
    errorMessage:null
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN_USER":
            return { ...state, user: action.payload };
        
        case "LOG_OUT":
          return { 
              user: null,
              address: null,
            };
        case "USER_ADDRESS":
            return { ...state, address: action.payload };
        
        case "UPDATE_USER":
            return {
                ...state,
                user: {
                    ...state.user,
                    ...action.payload,
                },
            };

        case "SELECT_CHECKOUT_ADDRESS":
            return { ...state, selectedUserCheckoutAddress: action.payload };
        
         case "REMOVE_CHECKOUT_ADDRESS":
            return { ...state, selectedUserCheckoutAddress: null };

        case "IS_FETCHING":
            return {
                ...state,
                isLoading: true,
                errorMessage: null,
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