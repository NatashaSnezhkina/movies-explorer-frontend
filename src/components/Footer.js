import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <h3 className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</h3>
      <div className='footer__line '></div>
      <div className='footer__info'>
        <p className="footer__copyright">&copy; {new Date().getFullYear()}</p>
        <div className='footer__links'>
          <a className='footer__link' href="URL">Яндекс.Практикум</a>
          <a className='footer__link' href="URL">Github</a>
          <a className='footer__link' href="URL">Facebook</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;