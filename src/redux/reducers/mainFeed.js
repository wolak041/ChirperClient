import {
  MAIN_FEED_PENDING,
  MAIN_FEED_SUCCESS,
  // MAIN_FEED_ERROR,
  MAIN_FEED_INITIAL_STATE,
} from '../actions/actionTypes';
import { statusIndicators, feed } from '../../helpers/constants';
import { extractPostIds } from '../../helpers/services';

const initialState = {
  status: statusIndicators.PENDING,
  mainFeed: [],
  lastPostDate: new Date().toISOString(),
  lastPostsIds: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case MAIN_FEED_PENDING: {
      return {
        ...state,
        status: statusIndicators.PENDING,
      };
    }
    case MAIN_FEED_SUCCESS: {
      const { mainFeed } = action.payload;

      const updatedMainFeed = [...state.mainFeed, ...mainFeed];
      const lastPostDate = updatedMainFeed.slice(-1)[0].date;
      const lastPostsIds = extractPostIds(
        mainFeed.length
          ? mainFeed
          : updatedMainFeed.slice(-feed.FETCH_POSTS_LIMIT),
      );

      return {
        ...state,
        status: statusIndicators.SUCCESS,
        mainFeed: updatedMainFeed,
        lastPostDate,
        lastPostsIds,
      };
    }
    // case MAIN_FEED_ERROR: {
    //   return {
    //     ...state,
    //     status: statusIndicators.LOGOUT,
    //     user: null,
    //   };
    // }
    case MAIN_FEED_INITIAL_STATE: {
      return { ...initialState };
    }
    default:
      return state;
  }
};
