const initialState = {
  isSuccess: '',
  token: '',
  isLoginSuccess: '',
  userLoginRegisterVisible: ''
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'get_data_register':
      return { ...state, isSuccess: action.payload }
    case 'get_token_user':
      return { ...state, token: action.payload.userToken, isLoginSuccess: true }
    case 'get_failed_login':
      return {...state, isLoginSuccess: false}
    case 'change_visible_user':
      return {...state, userLoginRegisterVisible: true}
    default:
      return state
  }
}

export default userReducer