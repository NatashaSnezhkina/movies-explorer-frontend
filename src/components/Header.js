import React, { useState, useEffect } from 'react';
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
      />
    </header>

  );
}

export default Header;