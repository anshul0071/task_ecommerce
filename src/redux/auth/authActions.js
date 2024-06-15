export const signup = (userData) => {
    return {
      type: 'SIGNUP',
      payload: userData
    };
  };
  
  export const login = (userData) => {
    return {
      type: 'LOGIN',
      payload: userData
    };
  };
  