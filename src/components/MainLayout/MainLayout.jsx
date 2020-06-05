import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleSidebar } from '../../redux/actions/mainLayout';
import { getUserState, getMainLayoutState } from '../../redux/selectors';
import Navbar from './Navbar';
import styles from './MainLayout.module.scss';

const MainLayout = props => {
  const { user } = useSelector(state => getUserState(state));
  const { isSidebarActive } = useSelector(state => getMainLayoutState(state));

  const dispatch = useDispatch();
  const toggleSidebarDispatch = useCallback(() => dispatch(toggleSidebar()), [
    dispatch,
  ]);

  return (
    <div className={styles.mainLayout}>
      <Navbar
        user={user}
        isSidebarActive={isSidebarActive}
        handleToggleMenu={toggleSidebarDispatch}
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
