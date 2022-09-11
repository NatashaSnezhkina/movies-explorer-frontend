import React, { useState, useEffect } from 'react';
import SearchForm from './SearchForm';
import MoviesCardList from './MoviesCardList';
import Footer from './Footer';
import Header from './Header';
import Preloader from './Preloader';

function Movies({
  moviesOnPage,
  saveMovie,
  deleteMovie,
  handleFilterMovies,
  handleUnfilterMovies,
  handleSearchMovies,
  isLoading,
  savedMovies,
  isNotFound
}) {

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

  const moviesCardList = moviesOnPage.slice(0, numberOfMovies);

  return (
    <div>
      <Header
        isLoggedIn={true}
      />
      <SearchForm
        handleFilterMovies={handleFilterMovies}
        handleUnfilterMovies={handleUnfilterMovies}
        handleSearchMovies={handleSearchMovies}
        isSaved={false}
      />
      {
        isLoading === true ?
          <Preloader
            isLoading={isLoading}
          />
          :
          !isNotFound ?
            <MoviesCardList
              moviesCardList={moviesCardList}
              isSaved={false}
              saveMovie={saveMovie}
              deleteMovie={deleteMovie}
              savedMovies={savedMovies}
            />
            : <span className='no-films'>Ничего не найдено</span>
      }
      <div className={`${moviesOnPage.length > 1
        ? moviesOnPage.length > numberOfMovies
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
