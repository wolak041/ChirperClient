import React from 'react';
import PropTypes from 'prop-types';
import styles from './Entry.module.scss';
import { Input, Button } from '../../components';

const Register = (props) => {
  const { forename, surname, email, password, repeatPassword } = props;

  return (
    <form className={styles.form}>
      <Input
        type="text"
        id="forename"
        label="Forename"
        value={forename}
        handleChange={props.handleInputChange}
      />
      <Input
        type="text"
        id="surname"
        label="Surname"
        value={surname}
        handleChange={props.handleInputChange}
      />
      <Input
        type="email"
        id="email"
        label="Email"
        value={email}
        handleChange={props.handleInputChange}
      />
      <Input
        type="password"
        id="password"
        label="Password"
        value={password}
        handleChange={props.handleInputChange}
      />
      <Input
        type="password"
        id="repeatPassword"
        label="Repeat password"
        value={repeatPassword}
        handleChange={props.handleInputChange}
      />
      <Button
        handleClick={props.handleFormSubmit}
        attributes={{ type: 'button' }}
      >Sign up</Button>
    </form>
  );
}

Register.propTypes = {
  handleInputChange: PropTypes.func,
  handleFormSubmit: PropTypes.func,
  forename: PropTypes.string,
  surname: PropTypes.string,
  email: PropTypes.string,
  password: PropTypes.string,
  repeatPassword: PropTypes.string
}

export default Register;
