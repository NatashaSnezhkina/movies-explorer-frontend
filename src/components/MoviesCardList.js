import React from 'react';
import MoviesCard from './MoviesCard';

function MoviesCardList({
  moviesCardList,
  isSaved
}) {
  return (
    <div className='card-list'>
      {moviesCardList.map((card) => {
        return (
          <MoviesCard
            key={card.id}
            card={card}
            isLiked={card.isLiked}
            isSaved={isSaved}
          />
        );
      })
      }
    </div>
  )
}

export default MoviesCardList;