import React from 'react';
import PropTypes from 'prop-types';
import styles from './MainLayout.module.scss';


const ElementWrapper = props => (
  <div
    className={`${props.classes?.root} ${styles.elementWrapper}`}
    onClick={props.onClick}
  >
    {props.children}
  </div>
);


ElementWrapper.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
  }),
  onClick: PropTypes.func,
};

export default ElementWrapper;
