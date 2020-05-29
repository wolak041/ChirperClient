import React from 'react';
import PropTypes from 'prop-types';
import { UserImage } from '../';
import styles from './UserPanel.module.scss';

const UserPanel = (props) => {
  return (
    <div className={styles.userPanel}>
      <UserImage img={props.img} />
      <p>{props.nickname}</p>
    </div>
  );
}

UserPanel.propTypes = {
  img: PropTypes.string,
  nickname: PropTypes.string
}

export default UserPanel;
