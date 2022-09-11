import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavigationPopup from './NavigationPopup';

function Navigation({
  isLoggedIn,
}) {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

  function clickNavigationMenu() {
    setIsMenuOpen(true);
  }

  function handleCloseNavigation() {
    setIsMenuOpen(false);
  }

  function screenChanging() {
    if (window.innerWidth <= 800) {
      setIsBurgerMenuOpen(true)
    } else {
      setIsBurgerMenuOpen(false);
    }
  }

  useEffect(() => {
    window.addEventListener('resize', screenChanging)
  })


  return (
    <>
      {
        isLoggedIn ?
          isBurgerMenuOpen === true ?
            <>
              <button className='button navigation__button' onClick={clickNavigationMenu}></button>
              <NavigationPopup
                isMenuOpen={isMenuOpen}
                onClose={handleCloseNavigation}
              />
            </>
            :
            <div className='navigation'>
              <div className='navigation__movies'>
                <Link to="/movies"
                  className='navigation__films'>
                  Фильмы
                </Link>

                <Link to="/saved-movies"
                  className='navigation__saved-films'>
                  Сохранённые фильмы
                </Link>
              </div>

              <Link to="/profile"
                className='navigation__account-link'>
                Аккаунт
              </Link>
            </div>
          :
          <section className='navigation navigation_logged-out'>
            <Link to="/signup"
              className='navigation__registration'>
              Регистрация
            </Link>

            <Link to="/signin"
              className='navigation__enter'>
              Войти
            </Link>
          </section >
      }

    </>
  );
}

export default Navigation
