import { hot } from 'react-hot-loader/root';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchMainFeed,
  newPostChange,
  newPostSave,
  likePost,
  dislikePost,
} from '../../redux/actions/mainFeed';
import { getMainFeedState, getUserState } from '../../redux/selectors';
import { Post, Text, UserPanel, Button } from '../../components';
import { statusIndicators, feed } from '../../helpers/constants';
import { saveNewPost } from '../../helpers/services';
import { debounce } from 'throttle-debounce';
import styles from './MainFeed.module.scss';

const MainFeed = () => {
  const {
    newPost,
    status,
    mainFeed,
    lastPostDate,
    lastPostsIds,
  } = useSelector(state => getMainFeedState(state));
  const { user } = useSelector(state => getUserState(state));

  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const handleNewPostChange = event => {
    dispatch(newPostChange(event.target.value));
  };
  const handleAddNewPostClick = async () => {
    const trimmedNewPost = newPost.trim();

    if (trimmedNewPost.length) {
      try {
        const response = await saveNewPost(trimmedNewPost);
        dispatch(newPostSave(response.newPost));
      } catch (error) {
        console.log(error); //TODO: display message in modal
      }
    } else {
      console.log('This post looks empty. Write something 😀'); //TODO: display message in modal
    }
  };

  const like = id => dispatch(likePost(id));
  const dislike = id => dispatch(dislikePost(id));

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
    <div className={styles.mainFeed}>
      <div className={styles.newPostWrapper}>
        <div className={styles.newPostPanel}>
          <UserPanel
            nickname={user.nickname}
            userId={user._id}
            classes={{ root: styles.userPanel }}
          />
          <Text
            value={newPost}
            onChange={handleNewPostChange}
            multiline={true}
            label="Add new post"
            classes={{
              root: styles.newPost,
              input: styles.newPostInput,
            }}
          />
        </div>
        <div
          className={`${styles.buttonWrapper} ${
            newPost.length ? styles.active : ''
          }`}
        >
          <Button
            onClick={handleAddNewPostClick}
            classes={{ root: styles.addButton }}
          >
            Add post
          </Button>
        </div>
      </div>
      {mainFeed.map(post => (
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
      {status === statusIndicators.PENDING && <div>Loading...</div>}
    </div>
  );
};

export default hot(MainFeed);
