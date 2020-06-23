import {
  USER_PENDING,
  USER_SUCCESS,
  USER_LOGOUT,
} from '../actions/actionTypes';
import { statusIndicators } from '../../constants';

const initialState = {
  status: statusIndicators.PENDING,
  user: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_PENDING: {
      return {
        ...state,
        status: statusIndicators.PENDING,
        user: null,
      };
    }
    case USER_SUCCESS: {
      const { user } = action.payload;
      return {
        ...state,
        status: statusIndicators.SUCCESS,
        user,
      };
    }
    case USER_LOGOUT: {
      return {
        ...state,
        status: statusIndicators.LOGOUT,
        user: null,
      };
    }
    default:
      return state;
  }
};
