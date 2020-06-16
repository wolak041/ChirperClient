import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../components';
import arrow from '../../assets/images/arrow.svg';
import styles from './Collapsible.module.scss';

const Collapsible = props => {
  const {
    onClick,
    variant = 'outlined',
    buttonText,
    buttonAttributes,
    classes,
  } = props;

  const [isActive, toggleActive] = useState(false);
  const handleClick = () => {
    onClick && onClick(!isActive);

    toggleActive(prevIsActive => {
      return !prevIsActive
    });
  };
  const isArrowReverse = isActive ? styles.reverse : '';

  return (
    <div className={`${styles.collapsible} ${classes?.root}`}>
      <Button
        onClick={handleClick}
        variant={variant}
        classes={{ root: `${styles.button} ${classes?.button}` }}
        {...buttonAttributes}
      >
        <img
          src={arrow}
          alt="arrow"
          className={`${styles.arrow} ${isArrowReverse}`}
        />
        <span className={classes?.span}>{buttonText}</span>
        <img
          src={arrow}
          alt="arrow"
          className={`${styles.arrow} ${isArrowReverse}`}
        />
      </Button>
      <div
        className={`${styles.content} ${isActive ? styles.active : ''} ${
          classes?.content
        }`}
      >
        {props.children}
      </div>
    </div>
  );
};

Collapsible.propTypes = {
  onClick: PropTypes.func,
  variant: PropTypes.string,
  buttonText: PropTypes.string,
  buttonAttributes: PropTypes.object,
  classes: PropTypes.shape({
    root: PropTypes.string,
    button: PropTypes.string,
    span: PropTypes.string,
    content: PropTypes.string,
  }),
};

export default Collapsible;
