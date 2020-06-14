import {
  USER_FEED_PENDING,
  USER_FEED_PART,
  USER_FEED_ERROR,
  USER_FEED_REFRESH,
} from './actionTypes';
import { getUserFeed } from '../../helpers/services';
import { feed } from '../../helpers/constants';

const handleGetUserFeed = (
  lastPostDate,
  limit,
  lastPostsIds,
  userId,
  dispatchType,
) => async dispatch => {
  dispatch({
    type: USER_FEED_PENDING,
  });

  try {
    const { feed: userFeed } = await getUserFeed(
      lastPostDate,
      limit,
      lastPostsIds,
      userId,
    );

    dispatch({
      type: dispatchType,
      payload: { userFeed },
    });
  } catch (error) {
    dispatch({
      type: USER_FEED_ERROR,
    });
  }
};

export const fetchUserFeed = (lastPostDate, limit, lastPostsIds, userId) =>
  handleGetUserFeed(lastPostDate, limit, lastPostsIds, userId, USER_FEED_PART);

export const refreshUserFeed = userId =>
  handleGetUserFeed(
    new Date().toISOString(),
    feed.FETCH_POSTS_LIMIT,
    [],
    userId,
    USER_FEED_REFRESH,
  );
