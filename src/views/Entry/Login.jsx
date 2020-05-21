import React from 'react';
import PropTypes from 'prop-types';
import styles from './Entry.module.scss';
import { Text, Button, HelperText } from '../../components';

const Login = (props) => {
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = props.formik;

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
    >
      <Text
        type="email"
        name="email"
        label="Email"
        value={values.email}
        handleChange={handleChange}
        handleBlur={handleBlur}
      >
        <HelperText type="error">{touched.email && errors.email}</HelperText>
      </Text>
      <Text
        type="password"
        name="password"
        label="Password"
        value={values.password}
        handleChange={handleChange}
        handleBlur={handleBlur}
      >
        <HelperText type="error">{touched.password && errors.password}</HelperText>
      </Text>
      <Button
        attributes={{ type: 'submit' }}
      >Sign in</Button>
    </form>
  );
}

Login.propTypes = {
  formik: PropTypes.object,
}

export default Login;
