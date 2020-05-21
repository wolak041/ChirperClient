import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.scss';

const Button = (props) => {
  const { disabled, classes, attributes } = props;

  return (
    <button
      className={`${classes?.root} ${styles.button}`}
      onClick={props.handleClick}
      disabled={disabled}
      {...attributes}
    >{props.children}</button>
  );
}

Button.propTypes = {
  handleClick: PropTypes.func,
  disabled: PropTypes.bool,
  classes: PropTypes.object,
  attributes: PropTypes.object
}

export default Button;
