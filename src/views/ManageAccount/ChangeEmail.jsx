import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Collapsible, Text, HelperText, Button } from '../../components';
import { isEmailAvailable, changeEmail } from '../../services';
import styles from './ManageAccount.module.scss';

const ChangeEmail = () => {
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
    initialValues: { email: '' },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Field required'),
    }),
    onSubmit: async (values, formik) => {
      try {
        if (!(await isEmailAvailable(values.email))) {
          throw new Error('Email is already in use');
        } else {
          const response = await changeEmail(values.email);
          formik.setStatus({ formInfo: response.message });
        }
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
    <Collapsible buttonText="Change email" onClick={resetFormik}>
      <form onSubmit={handleSubmit} className={styles.form}>
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
        <Button attributes={{ type: 'submit' }}>Change email</Button>
      </form>
      {errors?.formError && (
        <HelperText type="error">{errors.formError}</HelperText>
      )}
      {status?.formInfo && (
        <HelperText type="success">{status.formInfo}</HelperText>
      )}
    </Collapsible>
  );
};

export default ChangeEmail;
