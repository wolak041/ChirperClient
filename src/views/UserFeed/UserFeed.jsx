import React, { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUserFeedState } from '../../redux/selectors';
import { refreshUserFeed, fetchUserFeed } from '../../redux/actions/userFeed';
import { Post } from '../../components';
import { statusIndicators, feed } from '../../helpers/constants';
import { debounce } from 'throttle-debounce';
import userDefault from '../../assets/images/user-default.svg';
import styles from './UserFeed.module.scss';

const UserFeed = () => {
  const { userId } = useParams();
  const {
    status,
    user,
    userFeed,
    lastPostDate,
    lastPostsIds,
  } = useSelector(state => getUserFeedState(state));

  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    dispatch(refreshUserFeed(userId));
  }, [dispatch, userId]);

  const debounceFetch = debounce(400, false, () => {
    dispatch(
      fetchUserFeed(lastPostDate, feed.FETCH_POSTS_LIMIT, lastPostsIds, userId),
    );
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

  const isUserIdEqual = userId === user._id;

  return (
    <div className={styles.userFeed}>
      {isUserIdEqual && (
        <>
          <div className={styles.userPanel}>
            <img src={userDefault} alt="user" />
            <p>{user.nickname}</p>
          </div>
          {userFeed.map(post => (
            <Post date={post.date} user={post.user} key={post._id}>
              {post.content}
            </Post>
          ))}
        </>
      )}
      {status === statusIndicators.PENDING && <div>Loading...</div>}
    </div>
  );
};

export default UserFeed;
