import { SIDEBAR_OPEN, SIDEBAR_CLOSE } from '../actions/actionTypes';

const initialState = {
  isSidebarActive: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIDEBAR_OPEN: {
      return {
        ...state,
        isSidebarActive: true,
      };
    }
    case SIDEBAR_CLOSE: {
      return {
        ...state,
        isSidebarActive: false,
      };
    }
    default:
      return state;
  }
};
