import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import { useFormWithValidation } from "../hooks/useFormWithValidation";
import { CurrentUserContext } from '../context/CurrentUserContext';
import validator from 'validator';

function Profile({
  signOut,
  changeUserInfo,
  isUpdatedSuccessfully,
  isUpdated,
  setIsUpdated
}) {
  const [emailError, setEmailError] = useState('');
  const { values, handleChange, errors, isValid, setIsValid, resetForm, setValues } = useFormWithValidation();
  const currentUser = useContext(CurrentUserContext);

  function handleChangeInput(e) {
    handleChange(e);
    setIsUpdated(false);

  }

  function handleEmailChange(e) {
    handleChange(e);
    setIsUpdated(false);

    var email = e.target.value;
    if (validator.isEmail(email)) {
      setEmailError('')
    } else {
      setEmailError('Введите корректный email')
    }
  }

  function editProfile(e) {
    e.preventDefault();
    changeUserInfo({ email: values.email, name: values.name });
    resetForm();
  }

  useEffect(() => {
    setValues(currentUser);
    setIsValid(false);
  }, [currentUser, setValues, setIsValid])

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
              id='userEmail'
              type='email'
              name='email'
              placeholder='Email'
              value={values.email || ''}
              required
              onChange={(e) => handleEmailChange(e)}>
            </input>
          </div>
          <span className='error'>{emailError}</span>
          <button
            className={`profile__button button ${!isValid ||
              (values.name === currentUser.name &&
                values.email === currentUser.email) ? 'profile__button_disable' : ''}`}
            type="submit"
          >
            Редактировать
          </button>
          <span className='profile__updated-message'>{isUpdated ? isUpdatedSuccessfully===false ? 'При обновлении профиля произошла ошибка.' : 'Данные пользователя успешно обновлены!' : ''}</span>
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