import {
  MAIN_FEED_PENDING,
  MAIN_FEED_REFRESH,
  MAIN_FEED_PART,
  NEW_POST_CHANGE,
  NEW_POST_SAVE,
  MAIN_FEED_ERROR,
} from './actionTypes';
import { getMainFeed } from '../../helpers/services';
import { feed } from '../../helpers/constants';

const handleGetMainFeed = (
  lastPostDate,
  limit,
  lastPostsIds,
  dispatchType,
) => async dispatch => {
  dispatch({
    type: MAIN_FEED_PENDING,
  });

  try {
    const { feed: mainFeed } = await getMainFeed(
      lastPostDate,
      limit,
      lastPostsIds,
    );

    dispatch({
      type: dispatchType,
      payload: { mainFeed },
    });
  } catch (error) {
    dispatch({
      type: MAIN_FEED_ERROR,
    });
  }
};

export const refreshMainFeed = () =>
  handleGetMainFeed(
    new Date().toISOString(),
    feed.FETCH_POSTS_LIMIT,
    [],
    MAIN_FEED_REFRESH,
  );

export const fetchMainFeed = (lastPostDate, limit, lastPostsIds) =>
  handleGetMainFeed(lastPostDate, limit, lastPostsIds, MAIN_FEED_PART);

export const newPostChange = newPost => dispatch => {
  dispatch({
    type: NEW_POST_CHANGE,
    payload: { newPost },
  });
};

export const newPostSave = newPost => dispatch => {
  dispatch({
    type: NEW_POST_SAVE,
    payload: { newPost },
  });
};
