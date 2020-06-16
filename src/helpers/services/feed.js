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

export const likePostFetch = async postId =>
  request(apiUrls.LIKE_POST, { postId });

export const dislikePostFetch = async postId =>
  request(apiUrls.DISLIKE_POST, { postId });

export const likePostToggle = (feed, postId) =>
  feed.map(post =>
    post._id === postId
      ? {
          ...post,
          isLiked: !post.isLiked,
          likesNumber: post.likesNumber + (post.isLiked ? -1 : 1),
        }
      : { ...post },
  );
