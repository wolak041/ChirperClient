import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMainFeed } from '../../redux/actions/mainFeed';
import { getMainFeedState } from '../../redux/selectors';
import { Post } from '../../components';
import { statusIndicators, feed } from '../../helpers/constants';
// import styles from './MainFeed.module.scss';

const MainFeed = () => {
  const { status, mainFeed, lastPostDate, lastPostsIds } = useSelector(state =>
    getMainFeedState(state),
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchMainFeed(lastPostDate, feed.FETCH_POSTS_LIMIT, lastPostsIds));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {mainFeed.map(post => (
        <Post date={post.date} user={post.user} key={post._id}>
          {post.content}
        </Post>
      ))}
      {status === statusIndicators.PENDING && <div>Loading...</div>}
    </div>
  );
};

export default MainFeed;
