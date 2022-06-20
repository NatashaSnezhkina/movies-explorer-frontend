import React, { useState } from 'react';
import FilterCheckbox from './FilterCheckbox';
// import searchFilm from '../images/searchFilms.svg';

function SearchForm() {
  return (
    <div className='search-form'>
      <div className='search-form__container'>
        <form className='search-form__search-line'>
          <input className='search-form__input' type='text' placeholder="Фильм" maxLength='30' required></input>
          <button className='search-form__button'></button>
        </form>
        <FilterCheckbox />
      </div>
      <div className='line search-form__line'></div>
    </div>
  );
}

export default SearchForm;