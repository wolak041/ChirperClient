import {
  USER_FEED_PENDING,
  USER_FEED_REFRESH,
  USER_FEED_PART,
  USER_FEED_ERROR,
  LIKE_POST_TOGGLE,
} from '../actions/actionTypes';
import { statusIndicators, feed } from '../../constants';
import { extractPostIds, likePostToggle } from '../../utils';

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
      const { userFeed, user } = action.payload;
      const lastPostDate = userFeed.slice(-1)[0]?.date || new Date();
      const lastPostsIds = extractPostIds(userFeed);

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
      const lastPostDate = updatedUserFeed.slice(-1)[0]?.date || new Date();
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
    case LIKE_POST_TOGGLE: {
      const { postId } = action.payload;
      const userFeed = likePostToggle(state.userFeed, postId);

      return {
        ...state,
        userFeed,
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
