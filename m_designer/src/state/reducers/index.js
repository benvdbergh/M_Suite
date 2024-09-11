import { combineReducers } from 'redux';
import globalReducer from './globalReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  global: globalReducer,
  user: userReducer,
});

export default rootReducer;
