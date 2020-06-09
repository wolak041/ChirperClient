import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchMainFeed,
  setMainFeedInitialState,
} from '../../redux/actions/mainFeed';
import { getMainFeedState } from '../../redux/selectors';
import { Post } from '../../components';
import { statusIndicators, feed } from '../../helpers/constants';
// import styles from './MainFeed.module.scss';

const MainFeed = () => {
  const { status, mainFeed } = useSelector(state => getMainFeedState(state));

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setMainFeedInitialState());
    dispatch(
      fetchMainFeed(new Date().toISOString(), feed.FETCH_POSTS_LIMIT, []),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {mainFeed.length > 0 &&
        mainFeed.map(post => (
          <Post date={post.date} user={post.user} key={post._id}>
            {post.content}
          </Post>
        ))}
      {status === statusIndicators.PENDING && <div>Loading...</div>}
    </div>
  );
};

export default MainFeed;
