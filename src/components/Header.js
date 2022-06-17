import React from 'react';
import logo from '../images/logo.svg';
import logoAuth from '../images/logoAuth.svg';
import Navigation from './Navigation';
import { Link } from 'react-router-dom';

function Header({
  isLoggedIn
}) {

  return (
    <header className={`header ${isLoggedIn === true ? 'header_logged-in' : ''}`}>
      <Link to="/">
        <img className='header__logo' alt='logo' src={`${isLoggedIn === true ? logoAuth : logo}`}></img>
      </Link>
      <Navigation
        isLoggedIn={isLoggedIn}
        isNavigationMenu={true}
      />
    </header>

  );
}

export default Header;