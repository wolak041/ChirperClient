import React from 'react';
import styles from './Entry.module.scss';
import chirpy from '../../assets/images/chirpy.svg';
import Login from './Login';
import Register from './Register';

class Entry extends React.Component {
  MODES = {
    LOGIN: 'login',
    REGISTER: 'register'
  }

  state = {
    mode: this.MODES.LOGIN,
    [this.MODES.LOGIN]: {
      email: '',
      password: ''
    },
    [this.MODES.REGISTER]: {
      forename: '',
      surname: '',
      email: '',
      password: '',
      repeatPassword: ''
    }
  }

  handleModeToggle = () => {
    const { LOGIN, REGISTER } = this.MODES
    this.setState(prevState => ({ mode: prevState.mode === LOGIN ? REGISTER : LOGIN }));
  }

  handleInputChange = (event) => {
    const { value, id } = event.target

    this.setState(prevState => ({
      [prevState.mode]: {
        ...prevState[prevState.mode],
        [id]: value
      }
    }));
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
  }

  render() {
    const { mode, login, register } = this.state;
    const { LOGIN, REGISTER } = this.MODES

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
              checked={mode === LOGIN}
              onChange={this.handleModeToggle}
            />
            <label htmlFor="register">Register</label>
            <input
              type="radio"
              name="mode"
              id="register"
              checked={mode === REGISTER}
              onChange={this.handleModeToggle}
            />
          </div>
          {mode === LOGIN
            ? <Login
              handleInputChange={this.handleInputChange}
              handleFormSubmit={this.handleFormSubmit}
              {...login}
            />
            : <Register
              handleInputChange={this.handleInputChange}
              handleFormSubmit={this.handleFormSubmit}
              {...register}
            />
          }
        </div>
      </div>
    );
  }
}

export default Entry;
