import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { userLogout } from '../../redux/actions/user';
import { UserPanel, Button } from '../';
import { logoutUser } from '../../helpers/services';
import { clientUrls } from '../../helpers/constants';
import styles from './MainLayout.module.scss';

const Sidebar = props => {
  const dispatch = useDispatch();
  const userLogoutDispatch = useCallback(() => dispatch(userLogout()), [
    dispatch,
  ]);

  const history = useHistory();
  const handleLogout = async () => {
    try {
      const response = await logoutUser();
      console.log(response);
      userLogoutDispatch();
      history.replace(clientUrls.MAIN);
    } catch (err) {
      console.log(err);
    }
  };

  const toggleActiveClass = props.isSidebarActive ? styles.sidebarActive : '';

  return (
    <>
      <div className={`${styles.sidebar} ${toggleActiveClass}`}>
        <UserPanel
          nickname={props.nickname}
          userId={props.userId}
          classes={{ root: `hideAtMd ${styles.sidebarUser}` }}
        />
        <Link
          className={styles.manageAccount}
          to={clientUrls.ACCOUNT}
          tabIndex="-1"
        >
          <Button variant="outlined">Manage account</Button>
        </Link>
        <Button onClick={handleLogout} classes={{ root: styles.logoutBtn }}>
          Logout
        </Button>
      </div>
      <div
        className={`${styles.overlay} ${toggleActiveClass}`}
        onClick={props.handleToggleMenu}
      />
    </>
  );
};

Sidebar.propTypes = {
  nickname: PropTypes.string,
  userId: PropTypes.string,
  isSidebarActive: PropTypes.bool,
  handleToggleMenu: PropTypes.func,
};

export default Sidebar;
