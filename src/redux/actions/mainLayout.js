import { SIDEBAR_TOGGLE } from './actionTypes';

export const toggleSidebar = () => dispatch => {
  dispatch({
    type: SIDEBAR_TOGGLE,
  });
};
