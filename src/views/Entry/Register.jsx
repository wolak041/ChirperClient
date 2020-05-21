import React from 'react';
import PropTypes from 'prop-types';
import styles from './Entry.module.scss';
import { Text, Button, HelperText } from '../../components';

const Register = (props) => {
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = props.formik;

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
    >
      <Text
        type="text"
        name="forename"
        label="Forename"
        value={values.forename}
        handleChange={handleChange}
        handleBlur={handleBlur}
      >
        <HelperText type="error">{touched.forename && errors.forename}</HelperText>
      </Text>
      <Text
        type="text"
        name="surname"
        label="Surname"
        value={values.surname}
        handleChange={handleChange}
        handleBlur={handleBlur}
      >
        <HelperText type="error">{touched.surname && errors.surname}</HelperText>
      </Text>
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
      <Text
        type="password"
        name="repeatPassword"
        label="Repeat password"
        value={values.repeatPassword}
        handleChange={handleChange}
        handleBlur={handleBlur}
      >
        <HelperText type="error">{touched.repeatPassword && errors.repeatPassword}</HelperText>
      </Text>
      <Button attributes={{ type: 'submit' }}>Sign up</Button>
    </form>
  );
}

Register.propTypes = {
  formik: PropTypes.object,
}

export default Register;
