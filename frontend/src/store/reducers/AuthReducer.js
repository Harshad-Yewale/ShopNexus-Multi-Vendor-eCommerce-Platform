const initialState = {
    user: null,
    address: [],
    applications:[],
    selectedUserCheckoutAddress: null,
    isLoading:false,
    errorMessage:null,
    authChecked:false
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN_USER":
            return { ...state, user: action.payload, authChecked: true };
        
        case "LOG_OUT":
          return { 
              ...state,
              user: null,
              address: null,
              authChecked: true,
            };

        case "AUTH_CHECK_COMPLETE":
            return { ...state, authChecked: true };
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
        
        case "FETCH_MY_SELLER_APPLICATION":
            return{...state, applications: action.payload}

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