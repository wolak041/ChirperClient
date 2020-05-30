import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { clientUrls } from '../../helpers/constants';
import userDefault from '../../assets/images/user-default.svg'
import styles from './UserPanel.module.scss';

const UserPanel = (props) => {
  return (
    <button className={styles.userPanel}>
      <Link to={`${clientUrls.USER}/${props.userId}`}>
        <img
          src={props.img ? props.img : userDefault}
          alt="user"
          className={styles.userImage}
        />
        <p>{props.nickname}</p>
      </Link>
    </button>
  );
}

UserPanel.propTypes = {
  img: PropTypes.string,
  nickname: PropTypes.string,
  userId: PropTypes.string
}

export default UserPanel;
