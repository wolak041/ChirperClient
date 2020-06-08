import {
  MAIN_FEED_PENDING,
  MAIN_FEED_SUCCESS,
  // MAIN_FEED_ERROR,
} from './actionTypes';
import { getMainFeed } from '../../helpers/services';

export const fetchMainFeed = (
  lastPostDate,
  limit,
  lastPostsIds,
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
      type: MAIN_FEED_SUCCESS,
      payload: { mainFeed },
    });
  } catch (error) {
    // dispatch({
    //   type: MAIN_FEED_ERROR,
    // });
  }
};
