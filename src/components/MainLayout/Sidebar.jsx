import React, { useCallback, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { userLogout } from '../../redux/actions/user';
import { UserPanel, Button } from '../';
import ElementWrapper from './ElementWrapper';
import { logoutUser } from '../../helpers/services';
import { clientUrls } from '../../helpers/constants';
import styles from './MainLayout.module.scss';

const Sidebar = props => {
  const { handleCloseMenu, isSidebarActive, nickname, userId } = props;

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

  const sidebarRef = useRef();
  const handleOutsideClick = event => {
    if (
      isSidebarActive &&
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target)
    ) {
      handleCloseMenu();
    }
  };
  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  });

  const toggleActiveClass = isSidebarActive ? styles.sidebarActive : '';

  return (
    <>
      <div
        className={`${styles.sidebar} ${toggleActiveClass}`}
        ref={sidebarRef}
      >
        <ElementWrapper
          classes={{ root: `hideAtMd ${styles.sidebarUser}` }}
          onClick={handleCloseMenu}
        >
          <UserPanel nickname={nickname} userId={userId} />
        </ElementWrapper>
        <ElementWrapper
          classes={{ root: styles.manageAccount }}
          onClick={handleCloseMenu}
        >
          <Link to={clientUrls.ACCOUNT} tabIndex="-1">
            <Button variant="outlined">Manage account</Button>
          </Link>
        </ElementWrapper>
        <Button onClick={handleLogout} classes={{ root: styles.logoutBtn }}>
          Logout
        </Button>
      </div>
      <div
        className={`${styles.overlay} ${toggleActiveClass}`}
        onClick={handleCloseMenu}
      />
    </>
  );
};

Sidebar.propTypes = {
  nickname: PropTypes.string,
  userId: PropTypes.string,
  isSidebarActive: PropTypes.bool,
  handleCloseMenu: PropTypes.func,
};

export default Sidebar;
