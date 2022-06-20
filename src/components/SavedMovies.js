import React from 'react';
import SearchForm from './SearchForm';
import MoviesCardList from './MoviesCardList';
import Footer from './Footer';
import Header from './Header';

function SavedMovies({
  savedMovies,
  isSaved
}) {
  return (
    <div>
      <Header
        isLoggedIn={true}
      />
      <SearchForm />
      <MoviesCardList
        moviesCardList={savedMovies}
        isSaved={isSaved}
      />
      <Footer />
    </div>
  )
}

export default SavedMovies;