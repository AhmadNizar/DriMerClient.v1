const initialState = {
  isSuccess: '',
  token: ''
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'get_data_register':
      return { ...state, isSuccess: action.payload }
    case 'get_token_user':
      return { ...state, token: action.payload }
    default:
      return state
  }
}

export default userReducer