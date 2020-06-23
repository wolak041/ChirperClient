export const extractPostIds = feed =>
  feed.reduce((ids, post) => [...ids, post._id], []);

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
