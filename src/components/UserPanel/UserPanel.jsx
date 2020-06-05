import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { clientUrls } from '../../helpers/constants';
import userDefault from '../../assets/images/user-default.svg';
import styles from './UserPanel.module.scss';

const UserPanel = props => {
  const { img, nickname, userId, classes } = props;

  return (
    <Link
      to={`${clientUrls.USER}/${userId}`}
      tabIndex="-1"
      className={`${styles.userPanel} ${classes?.root}`}
    >
      <button>
        <img
          src={img ? img : userDefault}
          alt="user"
          className={classes?.img}
        />
        <p className={classes?.p}>{nickname}</p>
      </button>
    </Link>
  );
};

UserPanel.propTypes = {
  img: PropTypes.string,
  nickname: PropTypes.string,
  userId: PropTypes.string,
  classes: PropTypes.shape({
    root: PropTypes.string,
    img: PropTypes.string,
    p: PropTypes.string,
  }),
};

export default UserPanel;
