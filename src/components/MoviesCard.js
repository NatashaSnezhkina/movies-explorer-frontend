import React from 'react';
import film from '../images/film.png';

function MoviesCard({
  isLiked,
  isSaved,
  card
}) {
  const movieDuration = `${Math.trunc(card.duration / 60)}ч ${card.duration % 60}м`
  return (
    <div className='card'>
      <div className='card__info'>
        <div className='card__text'>
          <h3 className='card__title'>{card.nameRU}</h3>
          <p className='card__duration'>{movieDuration}</p>
        </div>
        {
          isSaved === false ?
            <button className={`${isLiked === true ? 'card__like_active' : 'card__like'}`}></button>
            :
            <button className='card__delete'></button>
        }
      </div>
      <img className='card__image' src={`https://api.nomoreparties.co${card.image.url}`} alt={card.image.name}></img>
    </div >
  );
}

export default MoviesCard;