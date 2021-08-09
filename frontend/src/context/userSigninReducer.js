export const userSigninState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
}

export const userSigninReducer = (userSigninState, action) => {
  switch (action.type) {
    case 'USER_SIGNIN_REQUEST':
      return {
        loading: true,
      }
    case 'USER_SIGNIN_SUCCESS':
      return {
        loading: false,
        userInfo: action.payload,
      }
    case 'USER_SIGNIN_FAIL':
      return { loading: false, error: action.payload }
    case 'USER_SIGNIN_RESET':
      return {}
    case 'USER_SIGNOUT':
      return {}
    default:
      return userSigninState
  }
}
