import React from 'react';
import PropTypes from 'prop-types';
import success from '../../assets/images/success.svg';
import info from '../../assets/images/info.svg';
import error from '../../assets/images/error.svg';
import styles from './HelperText.module.scss';

const HelperText = props => {
  const { classes, attributes, type } = props;
  const icons = {
    success,
    info,
    error,
  };

  return (
    <>
      {props.children && (
        <div
          className={`${classes?.root} ${styles.helperText} ${styles?.[type]}`}
          {...attributes}
        >
          {icons[type] && <img src={icons[type]} alt="success" />}
          {props.children}
        </div>
      )}
    </>
  );
};

HelperText.propTypes = {
  type: PropTypes.oneOf(['info', 'success', 'error']).isRequired,
  classes: PropTypes.shape({
    root: PropTypes.string,
  }),
  attributes: PropTypes.object,
};

export default HelperText;
