import React from 'react';
import PropTypes from 'prop-types';
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';
import { clientUrls } from '../../helpers/constants';
import { UserPanel } from '../';
import chirpy from '../../assets/images/chirpy.svg';
import styles from './MainLayout.module.scss';

const Navbar = (props) => {
  const { user, isSidebarActive, handleToggleMenu } = props;

  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        <button
          className={styles.logo}
        >
          <Link
            to={clientUrls.MAIN}
            tabIndex="-1"
          >
            <img src={chirpy} alt="logo" />
            <p>Chirper</p>
          </Link>
        </button>
      </div>
      <div className={styles.right}>
        <UserPanel
          nickname={user.nickname}
          userId={user.id}
          classes={{ root: 'showAtMd' }}
        />
        <button
          className={`${styles.hamburgerMenu} ${isSidebarActive ? styles.isActive : ''}`}
          onClick={handleToggleMenu}
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
        handleToggleMenu={handleToggleMenu}
      />
    </nav>
  );
}

Navbar.propTypes = {
  isSidebarActive: PropTypes.bool,
  handleToggleMenu: PropTypes.func,
  user: PropTypes.shape({
    id: PropTypes.string,
    nickname: PropTypes.string,
    email: PropTypes.string
  })
}

export default Navbar;
