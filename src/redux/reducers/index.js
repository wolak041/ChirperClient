import { combineReducers } from 'redux';
import user from './user';
import mainLayout from './mainLayout';
import { USER_LOGOUT } from '../actions/actionTypes';

const appReducer = combineReducers({ user, mainLayout });

const rootReducer = (state, action) => {
  if (action.type === USER_LOGOUT) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
