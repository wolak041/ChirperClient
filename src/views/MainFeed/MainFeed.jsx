import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMainFeed } from '../../redux/actions/mainFeed';
import { getMainFeedState } from '../../redux/selectors';
import { Post } from '../../components';
import { statusIndicators, feed } from '../../helpers/constants';
import { debounce } from 'throttle-debounce';
// import styles from './MainFeed.module.scss';

const MainFeed = () => {
  const { status, mainFeed, lastPostDate, lastPostsIds } = useSelector(state =>
    getMainFeedState(state),
  );

  const dispatch = useDispatch();
  const debounceFetch = debounce(400, false, () => {
    dispatch(fetchMainFeed(lastPostDate, feed.FETCH_POSTS_LIMIT, lastPostsIds));
  });

  useEffect(() => {
    const handleScroll = () => {
      const getScrollPosition =
        window.innerHeight + document.documentElement.scrollTop;
      const fetchStartPoint = document.documentElement.offsetHeight * 0.8;
      const isFetching = status !== statusIndicators.PENDING;

      getScrollPosition >= fetchStartPoint && isFetching && debounceFetch();
    };

    document.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [status, debounceFetch]);

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
