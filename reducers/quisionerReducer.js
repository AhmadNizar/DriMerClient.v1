const initialState = {
  waterNeeds: 0
}

const quisionerReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'get_data_water':
      let waterNeeds = ((action.payload.sportTime + action.payload.isSmoker) / 2) * action.payload.weight
      return { ...state, waterNeeds: waterNeeds }
    default:
      return state
  }
}

export default quisionerReducer