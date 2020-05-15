import { FETCH_USER_PENDING, FETCH_USER_SUCCESS, FETCH_USER_ERROR } from '../actions/actionTypes';
import { statusIndicators } from '../../helpers/constants';

const initialState = {
  status: statusIndicators.PENDING,
  error: null,
  user: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_PENDING: {
      return {
        ...state,
        status: statusIndicators.PENDING,
        error: null,
        user: null,
      };
    }
    case FETCH_USER_SUCCESS: {
      const { user } = action.payload;
      return {
        ...state,
        status: statusIndicators.SUCCESS,
        error: null,
        user,
      };
    }
    case FETCH_USER_ERROR: {
      const { error } = action.payload;
      return {
        ...state,
        status: statusIndicators.ERROR,
        error,
        user: null,
      };
    }
    default:
      return state;
  }
};
