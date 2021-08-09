export const userRegisterState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
}

export const userRegisterReducer = (userRegisterState, action) => {
  switch (action.type) {
    case 'USER_REGISTER_REQUEST':
      return {
        loading: true,
      }
    case 'USER_REGISTER_SUCCESS':
      return {
        loading: false,
        userInfo: action.payload,
      }
    case 'USER_REGISTER_FAIL':
      return {
        loading: false,
        error: action.payload,
      }
    case 'USER_REGISTER_RESET':
      return {}
    default:
      return userRegisterState
  }
}
