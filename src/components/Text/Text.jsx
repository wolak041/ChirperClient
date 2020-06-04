import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Text.module.scss';

const Input = (props) => {
  const { onFocus, onChange, onBlur, type, name, label, id, value, classes, attributes } = props;

  const [isFocused, toggleFocus] = useState(false);
  const handleFocus = (event) => {
    toggleFocus(prevIsFocused => !prevIsFocused);
    onFocus && onFocus(event);
  }
  const handleBlur = (event) => {
    toggleFocus(prevIsFocused => !prevIsFocused);
    onBlur && onBlur(event);
  }
  const activeClass = isFocused ? styles.active : '';

  return (
    <div className={`${classes?.root} ${styles.root}`}>
      <div className={`${classes?.fieldWrapper} ${styles.fieldWrapper} ${activeClass}`}>
        <input
          type={type}
          name={name}
          className={`${classes?.input} ${styles.input}`}
          value={value}
          onFocus={handleFocus}
          onChange={onChange}
          onBlur={handleBlur}
          id={id}
          {...attributes}
        />
        {label &&
          <label
            className={`${classes?.label} ${styles.label} ${value.length ? styles.filled : ''} ${activeClass}`}
            htmlFor={id}
          >{label}</label>
        }
      </div>
      <div className={`${classes?.helper} ${styles.helper}`}>
        {props.children}
      </div>
    </div>
  );
}

Input.propTypes = {
  onFocus: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  type: PropTypes.string.isRequired,
  name: PropTypes.string,
  label: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  classes: PropTypes.shape({
    root: PropTypes.string,
    fieldWrapper: PropTypes.string,
    input: PropTypes.string,
    label: PropTypes.string,
    helper: PropTypes.string,
  }),
  attributes: PropTypes.object
}

export default Input;
