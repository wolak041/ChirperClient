import { hot } from 'react-hot-loader/root';
import React, { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUserFeedState } from '../../redux/selectors';
import {
  refreshUserFeed,
  fetchUserFeed,
  likePost,
  dislikePost,
} from '../../redux/actions/userFeed';
import { Post } from '../../components';
import { statusIndicators, feed } from '../../constants';
import { debounce } from 'throttle-debounce';
import userDefault from '../../assets/images/user-default.svg';
import styles from './UserFeed.module.scss';

const UserFeed = () => {
  const {
    status,
    user,
    userFeed,
    lastPostDate,
    lastPostsIds,
  } = useSelector(state => getUserFeedState(state));

  const dispatch = useDispatch();
  const { userId } = useParams();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    dispatch(refreshUserFeed(userId));
  }, [dispatch, userId]);

  const like = id => dispatch(likePost(id));
  const dislike = id => dispatch(dislikePost(id));

  const isUserIdEqual = userId === user._id;

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

      if (getScrollPosition >= fetchStartPoint && isFetching && isUserIdEqual) {
        debounceFetch();
      }
    };

    document.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [status, debounceFetch, isUserIdEqual]);

  return (
    <div className={styles.userFeed}>
      {isUserIdEqual && (
        <>
          <div className={styles.userPanel}>
            <img src={userDefault} alt="user" />
            <p>{user.nickname}</p>
          </div>
          {userFeed.map(post => (
            <Post
              id={post._id}
              date={post.date}
              user={post.user}
              likesNumber={post.likesNumber}
              isLiked={post.isLiked}
              like={like}
              dislike={dislike}
              key={post._id}
            >
              {post.content}
            </Post>
          ))}
        </>
      )}
      {status === statusIndicators.PENDING && <div>Loading...</div>}
    </div>
  );
};

export default hot(UserFeed);
