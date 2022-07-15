import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.svg';
import { useFormWithValidation } from '../hooks/useFormWithValidation';

function Login({
  handleLogin
}) {
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

  function handleChangeInput(e) {
    handleChange(e);
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
          id='email'
          type='email'
          name='email'
          value={values.email || ''}
          onChange={handleChangeInput}
          placeholder='email'
          required
        />
        <span className='error'>{errors.email}</span>
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
      </form>
      <p className="form__subtitle">Ещё не зарегистрированы? <Link to='/signup' className='form__link' href="#">Регистрация</Link></p>
    </section>
  )
}

export default Login;