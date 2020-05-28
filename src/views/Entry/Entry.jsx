import React, { useState, useCallback } from 'react';
import { useDispatch } from "react-redux";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useHistory } from "react-router-dom";
import { saveUser } from '../../redux/actions/user';
import Login from './Login';
import Register from './Register';
import { loginUser, registerUser, isNicknameAvailable, isEmailAvailable } from '../../helpers/services';
import { clientUrls } from '../../helpers/constants';
import chirpy from '../../assets/images/chirpy.svg';
import styles from './Entry.module.scss';

const Entry = () => {
  const MODES = {
    LOGIN: 'login',
    REGISTER: 'register'
  };

  const dispatch = useDispatch();
  const saveUserDispatch = useCallback(() => dispatch(saveUser()), [dispatch]);

  const history = useHistory();

  const login = {
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Field required'),
      password: Yup.string().required('Field required'),
    }),
    handleSubmit: async (values, formik) => {
      try {
        const response = await loginUser(values);
        formik.setStatus({ formInfo: response.message });
        saveUserDispatch(response.user);
        history.replace(clientUrls.MAIN);

      } catch (err) {
        formik.setStatus({});
        formik.setErrors({ formError: err.message });
      }
    }
  };
  const loginFormik = useFormik({
    initialValues: login.initialValues,
    validationSchema: login.validationSchema,
    onSubmit: login.handleSubmit,
    validateOnChange: false
  });

  const register = {
    initialValues: {
      nickname: '',
      email: '',
      password: '',
      repeatPassword: ''
    },
    validationSchema: Yup.object().shape({
      nickname: Yup.string().min(3, 'Nickname must be at least 6 character long')
        .matches(/^[a-zA-Z0-9_-]*$/g, 'Nickname can contains only alphanumeric characters, underscores and dashes')
        .required('Field required'),
      email: Yup.string().email('Invalid email address').required('Field required'),
      password: Yup.string().min(6, 'Password must be at least 6 character long')
        .required('Field required'),
      repeatPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Field required')
    }),
    handleSubmit: async (values, formik) => {
      try {
        if (!await isNicknameAvailable(values.nickname)) {
          throw new Error('Nickname is already in use');

        } else if (!await isEmailAvailable(values.email)) {
          throw new Error('Email is already in use');

        } else {
          const response = await registerUser(values);
          formik.setStatus({ formInfo: response.message });
          saveUserDispatch(response.user);
          history.replace(clientUrls.MAIN);
        }

      } catch (err) {
        formik.setStatus({});
        formik.setErrors({ formError: err.message });
      }
    }
  };
  const registerFormik = useFormik({
    initialValues: register.initialValues,
    validationSchema: register.validationSchema,
    validate: register.validate,
    onSubmit: register.handleSubmit,
    validateOnChange: false
  });

  const [mode, setMode] = useState(MODES.LOGIN);
  const handleModeToggle = () => {
    setMode(prevMode => {
      const isPrevModeLogin = prevMode === MODES.LOGIN;

      if (isPrevModeLogin) {
        loginFormik.setErrors({});
        loginFormik.setStatus({});

      } else {
        registerFormik.setErrors({});
        registerFormik.setStatus({});
      }

      return isPrevModeLogin ? MODES.REGISTER : MODES.LOGIN
    });
  };

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
