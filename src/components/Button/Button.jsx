import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.scss';

const Button = props => {
  const { onClick, disabled, classes, attributes, variant = 'default' } = props;

  return (
    <button
      className={`${styles.button} ${styles[variant]} ${classes?.root}`}
      onClick={onClick}
      disabled={disabled}
      {...attributes}
    >
      {props.children}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  classes: PropTypes.shape({
    root: PropTypes.string,
  }),
  attributes: PropTypes.object,
  variant: PropTypes.oneOf(['default', 'outlined', 'link']),
};

export default Button;
