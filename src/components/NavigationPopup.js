import React from 'react';
import { Link } from 'react-router-dom';

function NavigationPopup({
  isMenuOpen,
  onClose
}) {
  return (
    <div className={`navigation-popup ${isMenuOpen === true ? 'navigation-popup_opened' : ''}`}>
      <div className='navigation-popup__overlay' onClick={onClose}></div>
      <button className='button navigation-popup__close-button' onClick={onClose}></button>
      <div className='navigation-popup__content'>
        <div className='navigation-popup__menu'>
          <Link to="/" className='navigation-popup__link'>Главная</Link>
          <Link to="/movies" className='navigation-popup__link'>Фильмы</Link>
          <Link to="/saved-movies" className='navigation-popup__link'>Сохранённые фильмы</Link>
        </div>
        <Link to="/profile"> <button className='navigation-popup__button'>Аккаунт</button></Link>
      </div>
    </div>
  );
}

export default NavigationPopup;
