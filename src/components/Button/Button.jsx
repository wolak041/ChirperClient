import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.scss';

const Button = (props) => {
  const { disabled, classes, attributes, variant = 'default' } = props;
  const variantClass = variant === 'outlined' ? styles.outlined : '';

  return (
    <button
      className={`${classes?.root} ${styles.button} ${variantClass}`}
      onClick={props.handleClick}
      disabled={disabled}
      {...attributes}
    >{props.children}</button>
  );
}

Button.propTypes = {
  handleClick: PropTypes.func,
  disabled: PropTypes.bool,
  classes: PropTypes.shape({
    root: PropTypes.string
  }),
  attributes: PropTypes.object,
  variant: PropTypes.oneOf(['default', 'outlined']),
}

export default Button;
