import { combineReducers } from 'redux';
import userReducer from './user.reducers';

const reducer = combineReducers({
  user: userReducer
});

const rootReducer = (state, action) => {
  return reducer(state, action);
};

export default rootReducer;
