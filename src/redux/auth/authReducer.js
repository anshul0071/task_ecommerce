const initialState = {
    isAuthenticated: false,
    user: null
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SIGNUP':
      case 'LOGIN':
        return {
          ...state,
          isAuthenticated: true,
          user: action.payload
        };
      default:
        return state;
    }
  };
  
  export default authReducer;
  