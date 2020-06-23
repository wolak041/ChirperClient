import { USER_PENDING, USER_SUCCESS, USER_LOGOUT } from './actionTypes';
import { getLoggedUser } from '../../services';
import { removeAccessToken, getAccessToken } from '../../utils';

export const fetchUser = () => async dispatch => {
  dispatch({
    type: USER_PENDING,
  });

  if (getAccessToken()) {
    try {
      const { user } = await getLoggedUser();

      dispatch(saveUser(user));
    } catch (error) {
      dispatch(userLoggedOut());
    }
  } else dispatch(userLoggedOut());
};

export const saveUser = user => ({
  type: USER_SUCCESS,
  payload: { user },
});

export const userLoggedOut = () => ({ type: USER_LOGOUT });

export const userLogout = () => async dispatch => {
  try {
    removeAccessToken();
    dispatch(userLoggedOut());
  } catch (error) {
    console.log(error);
  }
};
