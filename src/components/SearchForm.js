import React, { useState } from 'react';
import FilterCheckbox from './FilterCheckbox';
// import searchFilm from '../images/searchFilms.svg';

function SearchForm({
  handleSearchMovies
}) {

  const [inputText, setInputText] = useState('');

  function handleChange(e) {
    setInputText(e.target.value);
  }

  function searchMovies(e) {
    e.preventDefault();
    handleSearchMovies(inputText);
    setInputText('');
  }

  return (
    <div className='search-form'>
      <div className='search-form__container'>
        <form className='search-form__search-line' 
        onSubmit={searchMovies}
        >
          <input className='search-form__input'
            type='text'
            placeholder="Фильм"
            required
            value={inputText}
            onChange={handleChange}
          />
          <button className='search-form__button'></button>
        </form>
        <FilterCheckbox />
      </div>
      <div className='line search-form__line'></div>
    </div>
  );
}

export default SearchForm;