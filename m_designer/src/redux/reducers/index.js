import { combineReducers } from 'redux';
import lifReducer from './lifReducer';

const rootReducer = combineReducers({
  lif: lifReducer,
});

export default rootReducer;
