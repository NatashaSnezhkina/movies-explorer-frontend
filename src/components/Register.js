import React from 'react';
// import { Link } from 'react-router-dom';
import logo from '../images/logoRegister.svg';

function Register() {
  return (
    <section className='register'>
      <img className='logo' alt='logo' src={logo}></img>
      <h1 className='register__title'>Добро пожаловать!</h1>
      <form className='form'>
        <label className='form__label'>Имя</label>
        <input className='form__input' defaultValue='Виталий'></input>
        <span className='error'>Что-то пошло не так...</span>
        <label className='form__label'>E-mail</label>
        <input className='form__input' defaultValue='pochta@yandex.ru'></input>
        <span className='error'>Что-то пошло не так...</span>
        <label className='form__label'>Пароль</label>
        <input className='form__input'></input>
        <span className='error'>Что-то пошло не так...</span>
        <button className='button form__button'>Зарегистрироваться</button>
      </form>
      <p className="form__subtitle">Уже зарегистрированы? <a className='form__link' href="#">Войти</a></p>
    </section>
  );
}

export default Register;