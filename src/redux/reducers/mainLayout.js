import { SIDEBAR_TOGGLE } from '../actions/actionTypes';

const initialState = {
  isSidebarActive: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIDEBAR_TOGGLE: {
      return {
        ...state,
        isSidebarActive: !state.isSidebarActive,
      };
    }
    default:
      return state;
  }
};
