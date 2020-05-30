import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';
import { clientUrls } from '../../helpers/constants';
import { UserPanel } from '../';
import chirpy from '../../assets/images/chirpy.svg';
import styles from './MainLayout.module.scss';

const Navbar = (props) => {
  const [isMenuActive, toggleMenu] = useState(false);
  const handleToggleMenu = () => {
    toggleMenu(prevIsMenuActive => !prevIsMenuActive)
  }

  const { user } = props;

  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        <button
          className={styles.logo}
        >
          <Link to={clientUrls.MAIN}>
            <img src={chirpy} alt="logo" />
            <p>Chirper</p>
          </Link>
        </button>
      </div>
      <div className={styles.right}>
        <UserPanel nickname={user.nickname} userId={user.id} />
        <button
          className={`${styles.hamburgerMenu} ${isMenuActive ? styles.isActive : ''}`}
          onClick={handleToggleMenu}
        >
          <div className={styles.menuBox}>
            <div className={styles.menuMiddle} />
          </div>
        </button>
      </div>
      <Sidebar />
    </nav>
  );
}

Navbar.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string,
    nickname: PropTypes.string,
    email: PropTypes.string
  })
}

export default Navbar;
