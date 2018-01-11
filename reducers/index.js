import { combineReducers } from 'redux'
import userReducer from './userReducer'
import quisionerReducer from './quisionerReducer'

const rootReducer = combineReducers({
  userReducer,
  quisionerReducer
})

export default rootReducer