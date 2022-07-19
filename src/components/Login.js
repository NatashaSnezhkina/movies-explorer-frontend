import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.svg';
import { useFormWithValidation } from '../hooks/useFormWithValidation';
import validator from 'validator';

function Login({
  handleLogin,
  isLoggedInn,
  setLoggedInn,
  isLoggedInnSuccessfully,
  loginError
}) {
  const { values, handleChange, errors, isValid, setIsValid, resetForm } = useFormWithValidation();
  const [emailError, setEmailError] = useState('');

  function handleChangeInput(e) {
    handleChange(e);
    setLoggedInn(false);
  }

  function handleEmailChange(e) {
    handleChange(e);
    setLoggedInn(false);

    var email = e.target.value;
    if (validator.isEmail(email)) {
      setEmailError('');
      // setIsValid(true);
    } else {
      setEmailError('Введите корректный email');
      setIsValid(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleLogin({ email: values.email, password: values.password })
  }

  return (
    <section className='register'>
      <Link to='/'><img className='logo' alt='logo' src={logo}></img></Link>
      <h1 className='register__title'>Рады видеть!</h1>
      <form className='form' onSubmit={handleSubmit}>
        <label className='form__label'>E-mail</label>
        <input className='form__input'
          id='userEmail'
          type='email'
          name='email'
          placeholder='Email'
          value={values.email || ''}
          required
          onChange={(e) => handleEmailChange(e)}>
        </input>
        <span className='error'>{emailError}</span>
        <label className='form__label'>Пароль</label>
        <input className='form__input'
          id='password'
          type='password'
          name='password'
          value={values.password || ''}
          onChange={handleChangeInput}
          placeholder='password'
          required
        />
        <span className='error'>{errors.password}</span>
        <button className={`form__button login-button ${isValid === true ? '' : 'form__button_disable'}`} disabled={!isValid}>Войти</button>
        <span className='profile__updated-message'>{loginError ? 'Введен неправильный email или пароль.' : ''}</span>
      </form>
      <p className="form__subtitle">Ещё не зарегистрированы? <Link to='/signup' className='form__link' href="#">Регистрация</Link></p>
    </section>
  )
}

export default Login;