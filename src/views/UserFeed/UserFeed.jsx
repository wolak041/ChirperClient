import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

const UserFeed = () => {
  const { userId } = useParams();

  return (
    <div>UserFeed {userId}</div>
  );
}

UserFeed.propTypes = {
  match: PropTypes.object
}

export default UserFeed;
