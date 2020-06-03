import React from 'react';
import PropTypes from 'prop-types';
import styles from './Text.module.scss';

const Input = (props) => {
  const { onChange, onBlur, type, name, label, id, value, classes, attributes } = props;

  return (
    <div className={`${classes?.root} ${styles.wrapper}`}>
      {label &&
        <label
          className={`${classes?.label} ${styles.label}`}
          htmlFor={id}
        >{label}</label>
      }
      <input
        type={type}
        name={name}
        className={`${classes?.input} ${styles.input}`}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        id={id}
        {...attributes}
      />
      {props.children}
    </div>
  );
}

Input.propTypes = {
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
  classes: PropTypes.object,
  attributes: PropTypes.object
}

export default Input;
