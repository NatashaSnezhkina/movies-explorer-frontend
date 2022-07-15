import React, { useState, useEffect } from 'react';
import SearchForm from './SearchForm';
import MoviesCardList from './MoviesCardList';
import Footer from './Footer';
import Header from './Header';

function Movies({
  moviesOnPage,
  saveMovie,
  deleteMovie,
  handleFilterMovies,
  handleUnfilterMovies,
  handleSearchMovies,
  isLoading
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

  // useEffect(() => {
  //   setMovies
  // })


  // useEffect(() => {
  //   const moviesApi = JSON.parse(localStorage.getItem('movies'));
  //   const filteredMovies = JSON.parse(localStorage.getItem('filteredMovies'));
  //   const isFiltered = JSON.parse(localStorage.getItem('filterCheckbox'));
  
  //   console.log(moviesApi);
  //   console.log(filteredMovies);
  //   if (isFiltered) {
  //     console.log(filteredMovies);
  //     setMovies(filteredMovies);
  //   } else if (moviesApi) {
  //     setMovies(moviesApi);
  //   } else {
  //     setMovies([]);
  //   }
  //   console.log(movies);
  // }, []);

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
      <MoviesCardList
        moviesCardList={moviesCardList}
        isSaved={false}
        saveMovie={saveMovie}
        deleteMovie={deleteMovie}
        isLoading={isLoading}
      />
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
