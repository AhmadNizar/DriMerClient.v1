import { combineReducers } from 'redux'
import userReducer from './userReducer'
import quisionerReducer from './quisionerReducer'
import sensorReducer from './sensorReducer'

const rootReducer = combineReducers({
  userReducer,
  quisionerReducer,
  sensorReducer
})

export default rootReducer
