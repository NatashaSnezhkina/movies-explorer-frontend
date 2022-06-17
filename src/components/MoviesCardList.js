import React from 'react';
import MoviesCard from './MoviesCard';

function MoviesCardList({
  moviesCardList
}) {
  return (
    <div className='card-list'>
      {moviesCardList.map((card) => {
        return (
          <MoviesCard
            key={card.id}
            isLiked={card.isLiked}
          />
        );
      })
      }
    </div>
  )
}

export default MoviesCardList;