const initialState = {
  userEmoji: '❓',
  userStatus: '',
  totalStep: 0,
  savedStep: 0,
  statusSensor: 'false',
  countCall: -1,
  updateHistoryCount: 0
}

const sensorReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'get_user_status':
      return state
    case 'set_user_status':
      return {...state, userStatus: action.payload.userStatus, userEmoji: action.payload.userEmoji}
    case 'add_user_step':
      console.log('masuk step', action.payload, state.savedStep)
      return {...state, totalStep: +action.payload - +state.savedStep}
    case 'update_status_sensor':
      return {...state, statusSensor: true, countCall: state.countCall + 1}
    case 'init_step':
      console.log('initial step', action.payload, state.statusSensor)
      return {...state, savedStep: action.payload}
    case 'update_history_count':
      return {...state, updateHistoryCount: state.updateHistoryCount + 1}
    case 'clear_history_count':
      return {...state, updateHistoryCount: 0}
    default:
      return state
  }
}

export default sensorReducer
