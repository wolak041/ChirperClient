import React from 'react';
import PropTypes from 'prop-types';
import styles from './Entry.module.scss';
import { Text, Button, HelperText } from '../../components';

const Register = props => {
  const {
    values,
    errors,
    status,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  } = props.formik;

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Text
          type="text"
          name="nickname"
          label="Nickname"
          value={values.nickname}
          onChange={handleChange}
          onBlur={handleBlur}
        >
          <HelperText type="error">
            {touched.nickname && errors.nickname}
          </HelperText>
        </Text>
        <Text
          type="email"
          name="email"
          label="Email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        >
          <HelperText type="error">{touched.email && errors.email}</HelperText>
        </Text>
        <Text
          type="password"
          name="password"
          label="Password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
        >
          <HelperText type="error">
            {touched.password && errors.password}
          </HelperText>
        </Text>
        <Text
          type="password"
          name="repeatPassword"
          label="Repeat password"
          value={values.repeatPassword}
          onChange={handleChange}
          onBlur={handleBlur}
        >
          <HelperText type="error">
            {touched.repeatPassword && errors.repeatPassword}
          </HelperText>
        </Text>
        <Button attributes={{ type: 'submit' }} disabled={isSubmitting}>
          Sign up
        </Button>
      </form>
      <div className={styles.helper}>
        {errors?.formError && (
          <HelperText type="error">{errors.formError}</HelperText>
        )}
        {status?.formInfo && (
          <HelperText type="success">{status.formInfo}</HelperText>
        )}
      </div>
    </>
  );
};

Register.propTypes = {
  formik: PropTypes.object,
};

export default Register;
