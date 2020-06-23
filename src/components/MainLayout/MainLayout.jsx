import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { openSidebar, closeSidebar } from '../../redux/actions/mainLayout';
import { refreshMainFeed } from '../../redux/actions/mainFeed';
import { userLogout } from '../../redux/actions/user';
import { getUserState, getMainLayoutState } from '../../redux/selectors';
import Navbar from './Navbar';
import styles from './MainLayout.module.scss';

const MainLayout = props => {
  const { user } = useSelector(state => getUserState(state));
  const { isSidebarActive } = useSelector(state => getMainLayoutState(state));

  const dispatch = useDispatch();
  const openSidebarDispatch = useCallback(() => dispatch(openSidebar()), [
    dispatch,
  ]);
  const closeSidebarDispatch = useCallback(() => dispatch(closeSidebar()), [
    dispatch,
  ]);

  const userLogoutDispatch = useCallback(() => dispatch(userLogout()), [
    dispatch,
  ]);

  const refreshMainFeedDispatch = useCallback(
    () => dispatch(refreshMainFeed()),
    [dispatch],
  );

  return (
    <div className={styles.mainLayout}>
      <Navbar
        user={user}
        isSidebarActive={isSidebarActive}
        handleOpenMenu={openSidebarDispatch}
        handleCloseMenu={closeSidebarDispatch}
        handleLogout={userLogoutDispatch}
        refreshMainFeed={refreshMainFeedDispatch}
      />
      <div
        className={`${styles.content} ${
          isSidebarActive ? styles.sidebarActive : ''
        }`}
      >
        {props.children}
      </div>
    </div>
  );
};

export default MainLayout;
