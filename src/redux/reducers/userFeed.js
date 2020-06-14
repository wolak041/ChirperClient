import {
  USER_FEED_PENDING,
  USER_FEED_REFRESH,
  USER_FEED_PART,
  USER_FEED_ERROR,
} from '../actions/actionTypes';
import { statusIndicators, feed } from '../../helpers/constants';
import { extractPostIds } from '../../helpers/services';

const initialState = {
  status: statusIndicators.PENDING,
  user: {},
  userFeed: [],
  lastPostDate: new Date().toISOString(),
  lastPostsIds: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_FEED_PENDING: {
      return {
        ...state,
        status: statusIndicators.PENDING,
      };
    }
    case USER_FEED_REFRESH: {
      const { userFeed } = action.payload;

      const lastPostDate = userFeed.slice(-1)[0].date;
      const lastPostsIds = extractPostIds(userFeed);
      const user = userFeed[0].user;
      return {
        ...state,
        status: statusIndicators.SUCCESS,
        userFeed,
        lastPostDate,
        lastPostsIds,
        user
      }
    }
    case USER_FEED_PART: {
      const { userFeed } = action.payload;

      const updatedUserFeed = [...state.userFeed, ...userFeed];
      const lastPostDate = updatedUserFeed.slice(-1)[0].date;
      const lastPostsIds = extractPostIds(
        userFeed.length
          ? userFeed
          : updatedUserFeed.slice(-feed.FETCH_POSTS_LIMIT),
      );

      return {
        ...state,
        status: statusIndicators.SUCCESS,
        userFeed: updatedUserFeed,
        lastPostDate,
        lastPostsIds,
      };
    }
    case USER_FEED_ERROR: {
      return {
        ...state,
        status: statusIndicators.ERROR,
      };
    }
    default:
      return state;
  }
};
