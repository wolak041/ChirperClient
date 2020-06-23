import { apiUrls } from '../constants';
import { handleAuthRequest } from '../utils';

export const getMainFeed = async (lastPostDate, limit, lastPostsIds) =>
  await handleAuthRequest(apiUrls.GET_MAIN_FEED, 'POST', {
    lastPostDate,
    limit,
    lastPostsIds,
  });

export const getUserFeed = async (lastPostDate, limit, lastPostsIds, userId) =>
  await handleAuthRequest(apiUrls.GET_USER_FEED, 'POST', {
    lastPostDate,
    limit,
    lastPostsIds,
    userId,
  });

export const saveNewPost = async newPost =>
  await handleAuthRequest(apiUrls.SAVE_POST, 'POST', { newPost });

export const likePostFetch = async postId =>
  await handleAuthRequest(apiUrls.LIKE_POST, 'POST', { postId });

export const dislikePostFetch = async postId =>
  await handleAuthRequest(apiUrls.DISLIKE_POST, 'POST', { postId });
