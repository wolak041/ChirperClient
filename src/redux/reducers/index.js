import { combineReducers } from 'redux';
import user from './user';
import mainLayout from './mainLayout';
import mainFeed from './mainFeed';
import userFeed from './userFeed';
import { USER_LOGOUT } from '../actions/actionTypes';

const appReducer = combineReducers({ user, mainLayout, mainFeed, userFeed });

const rootReducer = (state, action) => {
  if (action.type === USER_LOGOUT) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
