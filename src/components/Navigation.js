import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavigationPopup from './NavigationPopup';

function Navigation({
  isLoggedIn,
  isNavigationMenu
}) {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function clickNavigationMenu() {
    setIsMenuOpen(true);
  }

  function handleCloseNavigation() {
    setIsMenuOpen(false);
  }

  return (
    <>
      {
        isLoggedIn === false
          ?
          <section className='navigation'>

            <Link to="/signup" className='navigation__registration'>
              Регистрация
            </Link>

            <Link to="/signin" className='navigation__enter'>
              Войти
            </Link>

          </section >

          : isNavigationMenu === true ?
            <>
              <button className='button navigation__button' onClick={clickNavigationMenu}></button>
              <NavigationPopup
                isMenuOpen={isMenuOpen}
                onClose={handleCloseNavigation}
              />
            </>
            :
            <div div className='navigation'>

              <Link to="/movies" className='navigation__films'>
                Фильмы
              </Link>

              <Link to="/saved-movies" className='navigation__saved-films'>
                Сохранённые фильмы
              </Link>

              <Link to="/profile" className='navigation__account-link'>
                Аккаунт
              </Link>

              <Link to="/profile" className='navigation__account-photo'></Link>

            </div>
      }

    </>
  );
}

export default Navigation
