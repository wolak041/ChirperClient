import { USER_PENDING, USER_SUCCESS, USER_LOGOUT } from './actionTypes';
import { getUser } from '../../helpers/services';

export const fetchUser = () => async dispatch => {
  dispatch({
    type: USER_PENDING,
  });

  try {
    const { user } = await getUser();

    dispatch({
      type: USER_SUCCESS,
      payload: { user },
    });
  } catch (error) {
    dispatch({
      type: USER_LOGOUT,
    });
  }
};

export const saveUser = user => async dispatch => {
  dispatch({
    type: USER_SUCCESS,
    payload: { user },
  });
};

export const userLogout = () => async dispatch => {
  dispatch({
    type: USER_LOGOUT,
  });
};
