import React from 'react';
import logo from '../images/logoRegister.svg';

function Login() {
  return (
    <section className='register'>
      <img className='logo' alt='logo' src={logo}></img>
      <h1 className='register__title'>Рады видеть!</h1>
      <form className='form'>
        <label className='form__label'>E-mail</label>
        <input className='form__input' defaultValue='pochta@yandex.ru'></input>
        <span className='error'>Что-то пошло не так...</span>
        <label className='form__label'>Пароль</label>
        <input className='form__input'></input>
        <span className='error'>Что-то пошло не так...</span>
        <button className='button form__button login-button'>Войти</button>
      </form>
      <p className="form__subtitle">Ещё не зарегистрированы? <a className='form__link' href="#">Регистрация</a></p>
    </section>

  )
}

export default Login;