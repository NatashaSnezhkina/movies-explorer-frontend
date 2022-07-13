import React from 'react';
import logo from '../images/logo.svg';
import Navigation from './Navigation';
import { Link } from 'react-router-dom';

function Header({
  isLoggedIn,
}) {

  return (
    <header className='header' >
      <Link to="/">
        <img className='header__logo' alt='logo' src={logo}></img>
      </Link>
      <Navigation
        isLoggedIn={isLoggedIn}
        isNavigationMenu={true}
      />
    </header>

  );
}

export default Header;