const initialState = {
  waterNeeds: 0
}

const quisionerReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'get_data_water':

      return { ...state, waterNeeds: action.payload }
    case 'get_suggestion':
      console.log(action.payload)
      return {...state, waterNeeds: action.payload.sugest}
    default:
      return state
  }
}

export default quisionerReducer