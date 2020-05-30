import React from 'react';
import { useSelector } from "react-redux";
import { getUserState } from '../../redux/selectors';
import Navbar from './Navbar';
import styles from './MainLayout.module.scss';

const MainLayout = (props) => {
  const { user } = useSelector(state => getUserState(state));

  return (
    <div className={styles.mainLayout}>
      <Navbar user={user} />
      {props.children}
    </div>
  );
}

export default MainLayout;
