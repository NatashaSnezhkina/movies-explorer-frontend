import React from 'react';
import Header from './Header';

function Profile() {
  return (
    <>
      <Header 
      isLoggedIn={true}
      />
      <section className='profile'>
        <h2 className='profile__title'>Привет, Виталий!</h2>
        <form className='profile__form'>
          <div className='profile__info'>
            <label className='profile__lable'>Имя</label>
            <input className='profile__input' defaultValue='Виталий'></input>
          </div>
          <div className='profile__line'></div>
          <div className='profile__info'>
            <label className='profile__lable'>E-mail</label>
            <input className='profile__input' defaultValue='pochta@yandex.ru'></input>
          </div>
          <button className='profile__button button'>Редактировать</button>
        </form>
        <a className='profile__link' href='#'>Выйти из аккаунта</a>
      </section>
    </>
  );
}

export default Profile;