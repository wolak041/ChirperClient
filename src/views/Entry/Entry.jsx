import React, { useState } from 'react';
import styles from './Entry.module.scss';
import chirpy from '../../assets/images/chirpy.svg';
import Login from './Login';
import Register from './Register';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const MODES = {
  LOGIN: 'login',
  REGISTER: 'register'
};

const login = {
  initialValues: {
    email: '',
    password: ''
  },
  validationSchema: Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().required('Required'),
  }),
  handleSubmit: (values) => {
    console.log(values);
  }
};

const register = {
  initialValues: {
    forename: '',
    surname: '',
    email: '',
    password: '',
    repeatPassword: ''
  },
  validationSchema: Yup.object().shape({
    forename: Yup.string().required('Required'),
    surname: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().required('Required'),
    repeatPassword: Yup.string().required('Required')
  }),
  handleSubmit: (values) => {
    console.log(values);
  }
}

const Entry = () => {
  const loginFormik = useFormik({
    initialValues: login.initialValues,
    validationSchema: login.validationSchema,
    onSubmit: login.handleSubmit,
    validateOnChange: false
  });

  const registerFormik = useFormik({
    initialValues: register.initialValues,
    validationSchema: register.validationSchema,
    onSubmit: register.handleSubmit,
    validateOnChange: false
  });

  const [mode, setMode] = useState(MODES.LOGIN);
  const handleModeToggle = () => {
    setMode(prevMode => {
      const isPrevModeLogin = prevMode === MODES.LOGIN;
      isPrevModeLogin ? loginFormik.setErrors({}) : registerFormik.setErrors({});

      return isPrevModeLogin ? MODES.REGISTER : MODES.LOGIN
    });
  }

  return (
    <div className={styles.entry}>
      <div className={styles.logo}>
        <img src={chirpy} alt="logo" />
        <div>Chirper</div>
      </div>
      <div className={styles.formWrapper}>
        <div className={styles.formSwitch}>
          <label htmlFor="login">Login</label>
          <input
            type="radio"
            name="mode"
            id="login"
            checked={mode === MODES.LOGIN}
            onChange={handleModeToggle}
          />
          <label htmlFor="register">Register</label>
          <input
            type="radio"
            name="mode"
            id="register"
            checked={mode === MODES.REGISTER}
            onChange={handleModeToggle}
          />
        </div>
        {mode === MODES.LOGIN
          ? <Login
            formik={loginFormik}
          />
          : <Register
            formik={registerFormik}
          />
        }
      </div>
    </div>
  );
}

export default Entry;
