import React from 'react';
import SearchForm from './SearchForm';
import MoviesCardList from './MoviesCardList';
import Footer from './Footer';
import Header from './Header';

function Movies() {
  const moviesCardList = [
    {
      isLiked: true,
      id: 1
    },
    {
      isLiked: true,
      id: 2
    },
    {
      isLiked: false,
      id: 3
    },
    {
      isLiked: true,
      id: 4
    },
    {
      isLiked: true,
      id: 5
    },
    {
      isLiked: false,
      id: 6
    },
    {
      isLiked: true,
      id: 7
    },
    {
      isLiked: true,
      id: 8
    },
    {
      isLiked: false,
      id: 9
    },
    {
      isLiked: true,
      id: 10
    },
    {
      isLiked: true,
      id: 11
    },
    {
      isLiked: false,
      id: 12
    },
    {
      isLiked: false,
      id: 13
    },
    {
      isLiked: true,
      id: 14
    },
    {
      isLiked: true,
      id: 15
    },
    {
      isLiked: false,
      id: 16
    }
  ]

  return (
    <div>
      <Header
        isLoggedIn={true}
      />
      <SearchForm />
      <MoviesCardList
        moviesCardList={moviesCardList}
      />
      <div className='more-button'>Ещё</div>
      <Footer />
    </div>
  );
}

export default Movies;
