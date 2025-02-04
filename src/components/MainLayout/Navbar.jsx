import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { clientUrls } from '../../constants';
import { UserPanel, Button } from '../';
import Sidebar from './Sidebar';
import chirpy from '../../assets/images/chirpy.png';
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
    if (location.pathname === clientUrls.MAIN) {
      window.scrollTo({ top: 0 });
      refreshMainFeed();
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        <Link to={clientUrls.MAIN} tabIndex="-1" className={styles.logo}>
          <Button variant="link" onClick={handleLogoClick}>
            <img src={chirpy} alt="logo" />
            <p>Chirper</p>
          </Button>
        </Link>
      </div>
      <div className={styles.right}>
        <UserPanel
          nickname={user.nickname}
          userId={user._id}
          classes={{ root: 'showAtMd' }}
        />
        <Button
          variant="link"
          classes={{
            root: `${styles.hamburgerMenu} ${
              isSidebarActive ? styles.isActive : ''
            }`,
          }}
          onClick={handleOpenMenu}
        >
          <div className={styles.menuBox}>
            <div className={styles.menuMiddle} />
          </div>
        </Button>
      </div>
      <Sidebar
        isSidebarActive={isSidebarActive}
        nickname={user.nickname}
        userId={user._id}
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
    _id: PropTypes.string,
    nickname: PropTypes.string,
    email: PropTypes.string,
  }),
};

export default Navbar;
