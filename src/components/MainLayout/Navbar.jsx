import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { clientUrls } from '../../helpers/constants';
import { UserPanel } from '../';
import Sidebar from './Sidebar';
import chirpy from '../../assets/images/chirpy.svg';
import styles from './MainLayout.module.scss';

const Navbar = props => {
  const {
    user,
    isSidebarActive,
    handleOpenMenu,
    handleCloseMenu,
    handleLogout,
    refreshMainFeed,
  } = props;

  const location = useLocation();
  const handleLogoClick = () => {
    location.pathname === clientUrls.MAIN && refreshMainFeed();
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        <Link to={clientUrls.MAIN} tabIndex="-1" className={styles.logo}>
          <button onClick={handleLogoClick}>
            <img src={chirpy} alt="logo" />
            <p>Chirper</p>
          </button>
        </Link>
      </div>
      <div className={styles.right}>
        <UserPanel
          nickname={user.nickname}
          userId={user.id}
          classes={{ root: 'showAtMd' }}
        />
        <button
          className={`${styles.hamburgerMenu} ${
            isSidebarActive ? styles.isActive : ''
          }`}
          onClick={handleOpenMenu}
        >
          <div className={styles.menuBox}>
            <div className={styles.menuMiddle} />
          </div>
        </button>
      </div>
      <Sidebar
        isSidebarActive={isSidebarActive}
        nickname={user.nickname}
        userId={user.id}
        handleCloseMenu={handleCloseMenu}
        handleLogout={handleLogout}
      />
    </nav>
  );
};

Navbar.propTypes = {
  isSidebarActive: PropTypes.bool,
  handleOpenMenu: PropTypes.func,
  handleCloseMenu: PropTypes.func,
  handleLogout: PropTypes.func,
  refreshMainFeed: PropTypes.func,
  user: PropTypes.shape({
    id: PropTypes.string,
    nickname: PropTypes.string,
    email: PropTypes.string,
  }),
};

export default Navbar;
