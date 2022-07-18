import React, { useState } from 'react';
import MoviesCard from './MoviesCard';
import Preloader from './Preloader';

function MoviesCardList({
  moviesCardList,
  isSaved,
  saveMovie,
  deleteMovie,
  savedMovies
}) {

  return (
    <div className='card-list'>
      {moviesCardList.map((movie) => {
        return (
          <MoviesCard
            key={movie.id || movie.movieId}
            movie={movie}
            isSaved={isSaved}
            saveMovie={saveMovie}
            deleteMovie={deleteMovie}
            saveMovies={savedMovies}
          />
        );
      })
      }
    </div>
  )
}

export default MoviesCardList;