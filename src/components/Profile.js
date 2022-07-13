import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import { useFormWithValidation } from "../hooks/useFormWithValidation";
import { CurrentUserContext } from '../context/CurrentUserContext';

function Profile({
  signOut,
  changeUserInfo
}) {
  const { values, handleChange, errors, isValid, resetForm, setValues } = useFormWithValidation();
  const currentUser = useContext(CurrentUserContext);

  function handleChangeInput(e) {
    handleChange(e);
  }

  function editProfile(e) {
    e.preventDefault();
    changeUserInfo({ email: values.email, name: values.name });
    resetForm()
  }

  useEffect(() => {
    setValues(currentUser)
  }, [currentUser, setValues])

  return (
    <>
      <Header
        isLoggedIn={true}
      />
      <section className='profile'>
        <h2 className='profile__title'>Привет, {currentUser.name}!</h2>

        <form className='profile__form'
          onSubmit={editProfile}>
          <div className='profile__info'>
            <label className='profile__lable'>Имя</label>
            <input className='profile__input'
              name='name'
              value={values.name || ''}
              type='text'
              onChange={handleChangeInput}
              minLength="2"
              required
            />
          </div>
          <div className='profile__line'></div>
          <span className='error'>{errors.name}</span>
          <div className='profile__info'>
            <label className='profile__lable'>E-mail</label>
            <input className='profile__input'
              name='email'
              value={values.email || ''}
              type='text'
              onChange={handleChangeInput}
              minLength="2"
              required
            />
          </div>
          <span className='error'>{errors.email}</span>
          <button className={`profile__button button ${isValid === true ? '' : 'profile__button_disable'}`}>
            Редактировать
          </button>
        </form>

        <Link to="/signin"
          className='profile__link'
          onClick={signOut}>
          Выйти из аккаунта
        </Link>

      </section>
    </>
  );
}

export default Profile;