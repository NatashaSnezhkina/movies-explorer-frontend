import React from 'react';
// import { Link } from 'react-router-dom';
import logo from '../images/logo.svg';
import { useFormWithValidation } from '../hooks/useFormWithValidation';

function Register({
  handleRegister
}) {

  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    handleRegister({ email: values.email, password: values.password, name: values.name });
    resetForm();
  }

  function handleChangeInput(e) {
    handleChange(e);
  }

  return (
    <section className='register'>
      <img className='logo logo_centered' alt='logo' src={logo}></img>
      <h1 className='register__title'>Добро пожаловать!</h1>
      <form className='form' onSubmit={handleSubmit}>

        <label className='form__label'>Имя</label>
        <input className='form__input'
          id='name'
          type='text'
          name='name'
          value={values.name || ''}
          onChange={handleChangeInput}
          placeholder='Имя'
          required
          minLength="2"
        />
        <span className='error'>{errors.name}</span>

        <label className='form__label'>E-mail</label>
        <input className='form__input'
          id='name'
          type='email'
          name='email'
          value={values.email || ''}
          onChange={handleChangeInput}
          placeholder='Email'
          required
        />
        <span className='error'>{errors.email}.</span>

        <label className='form__label'>Пароль</label>
        <input className='form__input'
          id='password'
          type='text'
          name='password'
          value={values.password || ''}
          onChange={handleChangeInput}
          placeholder='Пароль'
          required
          minLength="8"
        />
        <span className='error'>{errors.password}</span>

        <button className='form__button'>Зарегистрироваться</button>
      </form>
      <p className="form__subtitle">Уже зарегистрированы? <a className='form__link' href="#">Войти</a></p>
    </section>
  );
}

export default Register;