import React from 'react';
import PropTypes from 'prop-types';
import Navbar from './Navbar';
import styles from './MainLayout.module.scss';

const MainLayout = (props) => {
  return (
    <div className={styles.mainLayout}>
      <Navbar />
      {props.children}
    </div>
  );
}

MainLayout.propTypes = {
  test: PropTypes.any
}

export default MainLayout;
