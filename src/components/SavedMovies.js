import React from 'react';
import SearchForm from './SearchForm';
import MoviesCardList from './MoviesCardList';
import Footer from './Footer';
import Header from './Header';

function SavedMovies({
  savedMovies,
  isSaved,
  deleteMovie,
  handleFilterMovies,
  handleUnfilterMovies,
  handleSearchSavedMovies,
  isLoading
}) {

  console.log(savedMovies);

  return (
    <div>
      <Header
        isLoggedIn={true}
      />
      <SearchForm
        handleFilterMovies={handleFilterMovies}
        handleUnfilterMovies={handleUnfilterMovies}
        handleSearchMovies={handleSearchSavedMovies}
        isSaved={true}
      />
      <MoviesCardList
        moviesCardList={savedMovies}
        isSaved={isSaved}
        deleteMovie={deleteMovie}
        // savedMovies={savedMovies}
        isLoading={isLoading}
      />
      <Footer />
    </div>
  )
}

export default SavedMovies;