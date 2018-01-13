const initialState = {
  waterNeeds: 0
}

const quisionerReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'get_data_water':

      return { ...state, waterNeeds: action.payload }
    default:
      return state
  }
}

export default quisionerReducer