const authActons = {
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGOUT: 'LOGOUT',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_ERROR: 'LOGIN_ERROR',
  // login: () => ({
  //   type: authActons.LOGIN_REQUEST,
  // }),
  logout: () => ({
    type: authActons.LOGOUT,
  }),
  login: (authResponse) => {
    return (dispatch, getState) => {
      dispatch({
        type: authActons.LOGIN_REQUEST,
        authResponse
      });
    };
  }
};
export default authActons;
