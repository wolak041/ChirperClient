import {
  MAIN_FEED_PENDING,
  MAIN_FEED_REFRESH,
  MAIN_FEED_PART,
  NEW_POST_CHANGE,
  NEW_POST_SAVE,
  MAIN_FEED_ERROR,
  LIKE_POST_TOGGLE,
} from '../actions/actionTypes';
import { statusIndicators, feed } from '../../helpers/constants';
import { extractPostIds, likePostToggle } from '../../helpers/services';

const initialState = {
  status: statusIndicators.PENDING,
  mainFeed: [],
  lastPostDate: new Date().toISOString(),
  lastPostsIds: [],
  newPost: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case MAIN_FEED_PENDING: {
      return {
        ...state,
        status: statusIndicators.PENDING,
      };
    }
    case MAIN_FEED_REFRESH: {
      const { mainFeed } = action.payload;

      const lastPostDate = mainFeed.slice(-1)[0].date;
      const lastPostsIds = extractPostIds(mainFeed);

      return {
        ...state,
        status: statusIndicators.SUCCESS,
        mainFeed,
        lastPostDate,
        lastPostsIds,
      };
    }
    case MAIN_FEED_PART: {
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
    case NEW_POST_CHANGE: {
      const { newPost } = action.payload;

      return {
        ...state,
        newPost,
      };
    }
    case NEW_POST_SAVE: {
      const { newPost } = action.payload;
      const mainFeed = [newPost, ...state.mainFeed];

      return {
        ...state,
        mainFeed,
        newPost: '',
      };
    }
    case LIKE_POST_TOGGLE: {
      const { postId } = action.payload;
      const mainFeed = likePostToggle(state.mainFeed, postId);

      return {
        ...state,
        mainFeed,
      };
    }
    case MAIN_FEED_ERROR: {
      return {
        ...state,
        status: statusIndicators.ERROR,
      };
    }
    default:
      return state;
  }
};
