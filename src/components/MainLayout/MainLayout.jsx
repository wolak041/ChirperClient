import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { openSidebar, closeSidebar } from '../../redux/actions/mainLayout';
import { refreshMainFeed } from '../../redux/actions/mainFeed';
import { userLogout } from '../../redux/actions/user';
import { getUserState, getMainLayoutState } from '../../redux/selectors';
import { logoutUser } from '../../helpers/services';
import { clientUrls } from '../../helpers/constants';
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

  const history = useHistory();
  const handleLogout = async () => {
    try {
      const response = await logoutUser();
      console.log(response); //TODO: display message in modal
      userLogoutDispatch();
      history.replace(clientUrls.MAIN);
    } catch (err) {
      console.log(err); //TODO: display message in modal
    }
  };

  return (
    <div className={styles.mainLayout}>
      <Navbar
        user={user}
        isSidebarActive={isSidebarActive}
        handleOpenMenu={openSidebarDispatch}
        handleCloseMenu={closeSidebarDispatch}
        handleLogout={handleLogout}
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
