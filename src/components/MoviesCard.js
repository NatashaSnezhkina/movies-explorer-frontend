import React from 'react';
import film from '../images/film.png';

function MoviesCard({
  isLiked,
  isSaved
}) {
  return (
    <div className='card'>
      <img className='card__image' src={film} alt='film'></img>
      <div className='card__info'>
        <h3 className='card__title'>33 слова о дизайне</h3>
        <button className={`${isLiked === true ? 'card__like_active' : isSaved === true ? 'button' : 'card__like'}`}></button>
      </div>
      <div className='card__line'></div>
      <p className='card__duration'>1ч42м</p>
    </div >
  );
}

export default MoviesCard;