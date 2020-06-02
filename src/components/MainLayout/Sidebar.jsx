import React from 'react';
import PropTypes from 'prop-types';
import { UserPanel, Button } from '../';
import styles from './MainLayout.module.scss';

const Sidebar = (props) => {
  const toggleActiveClass = props.isSidebarActive ? styles.sidebarActive : ''

  return (
    <>
      <div className={`${styles.sidebar} ${toggleActiveClass}`}>
        <UserPanel
          nickname={props.nickname}
          userId={props.userId}
          classes={{ root: `hideAtMd ${styles.sidebarUser}` }}
        />
        <Button classes={{ root: styles.logoutBtn }}>Logout</Button>
      </div>
      <div
        className={`${styles.overlay} ${toggleActiveClass}`}
        onClick={props.handleToggleMenu}
      />
    </>
  );
}

Sidebar.propTypes = {
  nickname: PropTypes.string,
  userId: PropTypes.string,
  isSidebarActive: PropTypes.bool,
  handleToggleMenu: PropTypes.func,
}

export default Sidebar;
