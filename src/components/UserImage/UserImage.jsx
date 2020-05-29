import React from 'react';
import PropTypes from 'prop-types';
import userDefault from '../../assets/images/user-default.svg'
import styles from './UserImage.module.scss';

const UserImage = (props) => {
  return (
    <img src={props.img ? props.img : userDefault} alt="user" width="50" className={styles.userImage}/>
  );
}

UserImage.propTypes = {
  img: PropTypes.string
}

export default UserImage;
