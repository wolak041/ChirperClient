import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getMainFeedState } from '../../redux/selectors';
import { Post } from '../../components';
import { statusIndicators, feed } from '../../helpers/constants';
// import styles from './MainFeed.module.scss';

const MainFeed = () => {
  const { status, mainFeed, lastPostDate, lastPostsIds } = useSelector(state =>
    getMainFeedState(state),
  );

  const handleScroll = () => {
    console.log(1);

    // dispatch(fetchMainFeed(lastPostDate, feed.FETCH_POSTS_LIMIT, lastPostsIds));
  };

  useEffect(() => {
    document.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  });

  return (
    <div style={{ minHeight: '2000px' }}>
      {mainFeed.map(post => (
        <Post date={post.date} user={post.user} key={post._id}>
          {post.content}
        </Post>
      ))}
      {status === statusIndicators.PENDING && (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default MainFeed;
