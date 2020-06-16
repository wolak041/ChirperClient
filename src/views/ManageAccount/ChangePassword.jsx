import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Collapsible, Text, HelperText, Button } from '../../components';
import { changePassword } from '../../helpers/services';
import styles from './ManageAccount.module.scss';

const ChangePassword = () => {
  const {
    values,
    touched,
    errors,
    status,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues: {
      password: '',
      repeatPassword: '',
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(6, 'Password must be at least 6 character long')
        .required('Field required'),
      repeatPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Field required'),
    }),
    onSubmit: async (values, formik) => {
      try {
        const response = await changePassword(values.password);
        formik.setStatus({ formInfo: response.message });
      } catch (err) {
        formik.setStatus({});
        formik.setErrors({ formError: err.message });
      }
    },
    validateOnChange: false,
  });

  const resetFormik = isActive => {
    !isActive && resetForm();
  };

  return (
    <>
      <Collapsible buttonText="Change password" onClick={resetFormik}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <Text
            type="password"
            name="password"
            label="New password"
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
            label="Repeat new password"
            value={values.repeatPassword}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <HelperText type="error">
              {touched.repeatPassword && errors.repeatPassword}
            </HelperText>
          </Text>
          <Button attributes={{ type: 'submit' }}>Change password</Button>
        </form>
        {errors?.formError && (
          <HelperText type="error">{errors.formError}</HelperText>
        )}
        {status?.formInfo && (
          <HelperText type="success">{status.formInfo}</HelperText>
        )}
      </Collapsible>
    </>
  );
};

export default ChangePassword;
