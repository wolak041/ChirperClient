import { FETCH_USER_PENDING, FETCH_USER_SUCCESS, FETCH_USER_ERROR } from './actionTypes';
import { getUser } from '../../helpers/services';

export const fetchUser = () => async (dispatch) => {
  dispatch({
    type: FETCH_USER_PENDING,
  });

  try {
    const { user } = await getUser();

    dispatch({
      type: FETCH_USER_SUCCESS,
      payload: { user },
    });
  } catch (error) {
    dispatch({
      type: FETCH_USER_ERROR,
      payload: { error },
    });
  }
};
