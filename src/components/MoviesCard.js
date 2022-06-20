import React from 'react';
import film from '../images/film.png';

function MoviesCard({
  isLiked,
  isSaved
}) {
  return (
    <div className='card'>
      <div className='card__info'>
        <div className='card__text'>
          <h3 className='card__title'>33 слова о дизайне</h3>
          <p className='card__duration'>1ч42м</p>
        </div>
        {
          isSaved === false ?
            <button className={`${isLiked === true ? 'card__like_active' : 'card__like'}`}></button>
            :
            <button className='card__delete'></button>
        }
      </div>
      <img className='card__image' src={film} alt='film'></img>
    </div >
  );
}

export default MoviesCard;