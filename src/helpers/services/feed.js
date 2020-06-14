import { apiUrls } from '../constants';

const handleRequest = async request => {
  const response = await request.json();

  if (request.ok) return response;
  else throw new Error(response.error);
};

const request = async (url, body) =>
  await handleRequest(
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }),
  );

export const getMainFeed = async (lastPostDate, limit, lastPostsIds) =>
  request(apiUrls.GET_MAIN_FEED, {
    lastPostDate,
    limit,
    lastPostsIds,
  });

export const getUserFeed = async (lastPostDate, limit, lastPostsIds, userId) =>
  request(apiUrls.GET_USER_FEED, {
    lastPostDate,
    limit,
    lastPostsIds,
    userId,
  });

export const extractPostIds = feed =>
  feed.reduce((ids, post) => [...ids, post._id], []);

export const saveNewPost = async newPost =>
  request(apiUrls.SAVE_POST, { newPost });
