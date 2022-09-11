import React, { useState, useEffect } from 'react';

function MoviesCard({
  isSaved,
  movie,
  saveMovie,
  deleteMovie,
}) {

  const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
  const movieDuration = `${Math.trunc(movie.duration / 60)}ч ${movie.duration % 60}м`;
  const likedMovieFind = savedMovies.find((item) => item.nameRU === movie.nameRU);

  const [isLiked, setIsLiked] = useState(likedMovieFind ? true : false);

  function likeCard(e) {
    if (isLiked) {
      const searchMovie = savedMovies.find((item) => item.nameRU === movie.nameRU);
      deleteMovie(searchMovie._id);
      setIsLiked(false);
    } else {
      saveMovie(movie);
      setIsLiked(true);
    }
  }

  function handleDeleteMovie(e) {
    deleteMovie(movie._id);
  }

  return (
    <div className='card'>
      <div className='card__info'>
        <div className='card__text'>
          <h3 className='card__title'>{movie.nameRU}</h3>
          <p className='card__duration'>{movieDuration}</p>
        </div>
        {
          isSaved === false ?
            <button
              className={`${isLiked === true ? 'card__like_active' : 'card__like'}`}
              onClick={likeCard}
            >
            </button>
            :
            <button className='card__delete'
              onClick={handleDeleteMovie}>
            </button>
        }
      </div>
      <a href={movie.trailerLink} target="_blank"><img className='card__image'
        src={isSaved === false ? `https://api.nomoreparties.co${movie.image.url}` : movie.image}
        alt={movie.nameRU}
      ></img></a>
    </div >
  );
}

export default MoviesCard;