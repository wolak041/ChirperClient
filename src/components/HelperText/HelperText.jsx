import React from 'react';
import PropTypes from 'prop-types';
import styles from './HelperText.module.scss';

const HelperText = (props) => {
  const { classes, attributes, type } = props;

  return (
    <>
      {props.children && <div
        className={`${classes?.root} ${styles.helperText} ${styles?.[type]}`}
        {...attributes}
      >
        {props.children}
      </div>
      }
    </>
  );
}

HelperText.propTypes = {
  type: PropTypes.oneOf(['info', 'success', 'error']).isRequired,
  classes: PropTypes.shape({
    root: PropTypes.string
  }),
  attributes: PropTypes.object
}

export default HelperText;
