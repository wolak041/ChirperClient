import React from 'react';
import PropTypes from 'prop-types';
// import styles from './Post.module.scss';

const Post = props => {
  return (
    <div>{props.children}</div>
  );
}

Post.propTypes = {
  test: PropTypes.any
}

export default Post;
