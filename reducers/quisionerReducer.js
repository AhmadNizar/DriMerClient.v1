const initialState = {
  waterNeeds: 0
}

const quisionerReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'get_data_water':

      return { ...state, waterNeeds: action.payload }
    case 'get_suggestion':
      return {...state, waterNeeds: action.payload.sugest}
    case 'clear_suggestion':
      return {...state, waterNeeds: 0}
    default:
      return state
  }
}

export default quisionerReducer