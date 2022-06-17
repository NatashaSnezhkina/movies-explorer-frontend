import React from 'react';
import SearchForm from './SearchForm';
import MoviesCardList from './MoviesCardList';
import Footer from './Footer';
import Header from './Header';

function SavedMovies({
  savedMovies
}) {
  return (
    <div>
      <Header
        isLoggedIn={true}
      />
      <SearchForm />
      <MoviesCardList
        moviesCardList={savedMovies}
      />
      <Footer />
    </div>
  )
}

export default SavedMovies;