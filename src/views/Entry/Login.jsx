import React from 'react';
import PropTypes from 'prop-types';
import styles from './Entry.module.scss';
import { Input, Button } from '../../components';

const Login = (props) => {
  const { email, password } = props;

  return (
    <form className={styles.form}>
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
      <Button
        handleClick={props.handleFormSubmit}
        attributes={{ type: 'submit' }}
      >Sign in</Button>
    </form>
  );
}

Login.propTypes = {
  handleInputChange: PropTypes.func,
  handleFormSubmit: PropTypes.func,
  email: PropTypes.string,
  password: PropTypes.string
}

export default Login;
