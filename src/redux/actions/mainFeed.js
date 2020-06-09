import {
  MAIN_FEED_PENDING,
  MAIN_FEED_PART,
  MAIN_FEED_ERROR,
  MAIN_FEED_REFRESH,
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

export const fetchMainFeed = (lastPostDate, limit, lastPostsIds) =>
  handleGetMainFeed(lastPostDate, limit, lastPostsIds, MAIN_FEED_PART);

export const refreshMainFeed = () =>
  handleGetMainFeed(new Date().toISOString(), feed.FETCH_POSTS_LIMIT, [], MAIN_FEED_REFRESH);
