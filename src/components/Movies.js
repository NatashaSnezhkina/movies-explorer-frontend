import React, { useState, useEffect } from 'react';
import SearchForm from './SearchForm';
import MoviesCardList from './MoviesCardList';
import Footer from './Footer';
import Header from './Header';

function Movies({
  // movies,
  saveMovie,
  deleteMovie,
  savedMovies,
  handleFilterMovies,
  handleUnfilterMovies,
  handleSearchMovies,
  isLoading
}) {

  const movies = JSON.parse(localStorage.getItem('movies'));

  console.log(movies);

  const [numberOfMovies, setNumberOfMovies] = useState(() => {
    if (window.innerWidth > 1250) {
      return 12;
    } else if (window.innerWidth > 760) {
      return 8;
    } else {
      return 5;
    }
  });

  const [numberOfAddMovies, setNumberOfAddMovies] = useState(() => {
    if (window.innerWidth > 1250) {
      return 3;
    } else if (window.innerWidth > 760) {
      return 2;
    } else {
      return 2;
    }
  });

  const moviesCardList = movies.slice(0, numberOfMovies);

  function addMoreMovies() {
    setNumberOfMovies(numberOfMovies + numberOfAddMovies);
  }

  function screenChanging() {
    if (window.innerWidth > 1250) {
      setNumberOfMovies(12);
      setNumberOfAddMovies(3);
    } else if (window.innerWidth > 760) {
      setNumberOfMovies(8);
      setNumberOfAddMovies(2);
    } else {
      setNumberOfMovies(5);
      setNumberOfAddMovies(2);
    }
  }

  useEffect(() => {
    window.addEventListener('resize', screenChanging)
  })

  return (
    <div>
      <Header
        isLoggedIn={true}
      />
      <SearchForm
        handleFilterMovies={handleFilterMovies}
        handleUnfilterMovies={handleUnfilterMovies}
        handleSearchMovies={handleSearchMovies}
      />
      <MoviesCardList
        moviesCardList={moviesCardList}
        isSaved={false}
        saveMovie={saveMovie}
        deleteMovie={deleteMovie}
        savedMovies={savedMovies}
        isLoading={isLoading}
      />
      <div className={`${movies.length > 1
        ? movies.length > numberOfMovies
          ? 'more-button'
          : 'more-button_hide'
        : 'more-button_hide'}`}
        onClick={addMoreMovies}>
        Ещё</div>
      <Footer />
    </div>
  );
}

export default Movies;
