import React from 'react';
import { useSelector } from 'react-redux';
import { getUserState } from '../../redux/selectors';
import ChangeEmail from './ChangeEmail';
import ChangePassword from './ChangePassword';
import userDefault from '../../assets/images/user-default.svg';
import styles from './ManageAccount.module.scss';

const ManageAccount = () => {
  const { user } = useSelector(state => getUserState(state));

  return (
    <div className={styles.manageAccount}>
      <div className={styles.userPanel}>
        <img src={userDefault} alt="user" />
        <p>{user.nickname}</p>
      </div>
      <div className={styles.buttonWrapper}>
        <ChangeEmail />
        <ChangePassword />
      </div>
    </div>
  );
};

export default ManageAccount;
