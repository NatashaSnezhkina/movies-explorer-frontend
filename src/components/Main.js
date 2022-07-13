import React from 'react';
import Promo from './Promo';
import AboutProject from './AboutProject';
import Techs from './Techs';
import AboutMe from './AboutMe';
import Portfolio from './Portfolio';
import Footer from './Footer';
import Header from './Header';
import NavTab from './NavTab';

function Main({
  isLoggedInn,
}) {
  return (
    <section>
      <Header
        isLoggedIn={isLoggedInn}
      />
      <Promo />
      <NavTab />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
      <Footer />
    </section>
  )
}

export default Main;