import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { UserPanel } from '../';
import chirpy from '../../assets/images/chirpy.svg';
import styles from './MainLayout.module.scss';

const Navbar = () => {
  const [isMenuActive, toggleMenu] = useState(false);
  const handleToggleMenu = () => {
    toggleMenu(prevIsMenuActive => !prevIsMenuActive)
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <img src={chirpy} alt="logo" width="50" />
          <p>Chirper</p>
        </div>
      </div>
      <div className={styles.right}>
        <UserPanel nickname="Test" />
        <div
          className={`${styles.hamburgerMenu} ${isMenuActive ? styles.isActive : ''}`}
          onClick={handleToggleMenu}
        >
          <div className={styles.menuBox}>
            <div className={styles.menuMiddle} />
          </div>
        </div>
      </div>
      <Sidebar />
    </nav>
  );
}

export default Navbar;
