import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.scss';

const Button = (props) => {
  const { classes, attributes } = props;

  return (
    <button
      className={`${classes?.root} ${styles.button}`}
      onClick={props.handleClick}
      {...attributes}
    >{props.children}</button>
  );
}

Button.propTypes = {
  handleClick: PropTypes.func.isRequired,
  classes: PropTypes.object,
  attributes: PropTypes.object
}

export default Button;
