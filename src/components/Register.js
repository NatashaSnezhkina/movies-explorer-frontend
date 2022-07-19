import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.svg';
import { useFormWithValidation } from '../hooks/useFormWithValidation';
import validator from 'validator';

function Register({
  handleRegister
}) {
  const [emailError, setEmailError] = useState('');
  const { values, handleChange, errors, isValid, setIsValid, resetForm } = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    handleRegister({ email: values.email, password: values.password, name: values.name });
    resetForm();
  }

  function handleChangeInput(e) {
    handleChange(e);
  }

  function handleEmailChange(e) {
    handleChange(e);

    var email = e.target.value;
    if (validator.isEmail(email)) {
      setEmailError('');
      // setIsValid(true);
    } else {
      setEmailError('Введите корректный email');
      setIsValid(false);
    }
  }

  //   function handleEmailChange(e) {
  //     handleChange(e);

  //     e.target.value.match(
  //         /[^@\s]+@[^@\s]+\.[^@\s]+/
  //     )
  //         ? setIsValid(true)
  //         : setIsValid(false);
  // }

  return (
    <section className='register'>
      <Link to='/'><img className='logo logo_centered' alt='logo' src={logo}></img></Link>
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
          id='userEmail'
          type='email'
          name='email'
          placeholder='Email'
          value={values.email || ''}
          required
          onChange={(e) => handleEmailChange(e)}>
          {/* onChange={handleEmailChange}> */}

        </input>
        <span className='error'>{emailError}</span>

        <label className='form__label'>Пароль</label>
        <input className='form__input'
          id='password'
          type='password'
          name='password'
          value={values.password || ''}
          onChange={handleChangeInput}
          placeholder='Пароль'
          required
          minLength="8"
        />
        <span className='error'>{errors.password}</span>

        <button className={`form__button ${isValid === true ? '' : 'form__button_disable'}`} disabled={!isValid}>Зарегистрироваться</button>
      </form>
      <p className="form__subtitle">Уже зарегистрированы? <Link to='/signin' className='form__link' href="#">Войти</Link></p>
    </section>
  );
}

export default Register;