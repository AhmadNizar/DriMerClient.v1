export const setUserStatus = (userStatus, userStep, userEmoji) => {
  let userPayload = {
    userStatus: userStatus,
    userStep: userStep,
    userEmoji: userEmoji
  }
  return {
    type: 'set_user_status',
    payload: userPayload
  }
}

export const getUserStatus = () => {
  return {
    type: 'get_user_status'
  }
}

export const addUserStep = (newStep) => {
  return {
    type: 'add_user_step',
    payload: newStep
  }
}

export const updateStatusSensor = () => {
  return {
    type: 'update_status_sensor'
  }
}

export const initStep = (initialStep) => {
  return {
    type: 'init_step',
    payload: initialStep
  }
}

export const updateHistoryCount = () => {
  return {
    type: 'update_history_count'
  }
}

export const clearHistoryCount = () => {
  return {
    type: 'clear_history_count'
  }
}
