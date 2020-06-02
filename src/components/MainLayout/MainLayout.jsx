import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { getUserState } from '../../redux/selectors';
import Navbar from './Navbar';
import styles from './MainLayout.module.scss';

const MainLayout = (props) => {
  const { user } = useSelector(state => getUserState(state));
  const [isSidebarActive, toggleMenu] = useState(false);
  const handleToggleMenu = () => {
    toggleMenu(prevIsSidebarActive => !prevIsSidebarActive)
  }

  return (
    <div className={styles.mainLayout}>
      <Navbar
        user={user}
        isSidebarActive={isSidebarActive}
        handleToggleMenu={handleToggleMenu}
      />
      <div
        className={`${styles.content} ${isSidebarActive ? styles.sidebarActive : ''}`}
      >
        {props.children}
      </div>
    </div>
  );
}

export default MainLayout;
