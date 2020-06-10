import React from 'react';
import PropTypes from 'prop-types';
import { UserPanel, Button } from '../';
import heartOutline from '../../assets/images/heart-outline.svg';
import heartFilled from '../../assets/images/heart-filled.svg';
import styles from './Post.module.scss';

const Post = props => {
  const { user, date, isLiked, likesNumber = 0 } = props;
  const formattedDate = new Date(date).toLocaleString(undefined, {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className={styles.post}>
      <div className={styles.header}>
        <UserPanel
          userId={user._id}
          nickname={user.nickname}
          classes={{ root: styles.userPanel, button: styles.userPanelButton }}
        />
        <div className={styles.date}>{formattedDate}</div>
      </div>
      <div className={styles.content}>{props.children}</div>
      <div className={styles.likes}>
        <Button variant='link' classes={{ root: styles.likeButton }}>
          {isLiked ? (
            <img src={heartFilled} alt="heart filled" />
          ) : (
            <img src={heartOutline} alt="heart outlined" />
          )}
          <span>{likesNumber}</span>
        </Button>
      </div>
    </div>
  );
};

Post.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string,
    nickname: PropTypes.string,
  }),
  date: PropTypes.string,
  isLiked: PropTypes.bool,
  likesNumber: PropTypes.number,
};

export default Post;
