import React, {useState} from 'react';
import MoviesCard from './MoviesCard';
import Preloader from './Preloader';

function MoviesCardList({
  moviesCardList,
  isSaved,
  saveMovie,
  deleteMovie,
  isLoading
}) {

  return (
    <div className='card-list'>
      <Preloader 
        isLoading={isLoading}
      />
      {moviesCardList.map((movie) => {
        return (
          <MoviesCard
            key={movie.id || movie.movieId}
            movie={movie}
            isSaved={isSaved}
            saveMovie={saveMovie}
            deleteMovie={deleteMovie}
          />
        );
      })
      }
    </div>
  )
}

export default MoviesCardList;