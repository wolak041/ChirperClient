import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Collapsible, Text, HelperText, Button } from '../../components';
import { changePassword } from '../../services';
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
      oldPassword: '',
      newPassword: '',
      repeatNewPassword: '',
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string().required('Field required'),
      newPassword: Yup.string()
        .min(6, 'Password must be at least 6 character long')
        .required('Field required'),
      repeatNewPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
        .required('Field required'),
    }),
    onSubmit: async (values, formik) => {
      try {
        const response = await changePassword(values.oldPassword, values.newPassword);
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
            name="oldPassword"
            label="Old password"
            value={values.oldPassword}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <HelperText type="error">
              {touched.oldPassword && errors.oldPassword}
            </HelperText>
          </Text>
          <Text
            type="password"
            name="newPassword"
            label="New password"
            value={values.newPassword}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <HelperText type="error">
              {touched.newPassword && errors.newPassword}
            </HelperText>
          </Text>
          <Text
            type="password"
            name="repeatNewPassword"
            label="Repeat new password"
            value={values.repeatNewPassword}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <HelperText type="error">
              {touched.repeatNewPassword && errors.repeatNewPassword}
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
