import React, { useState, useEffect } from 'react';
import FilterCheckbox from './FilterCheckbox';
// import searchFilm from '../images/searchFilms.svg';

function SearchForm({
  handleFilterMovies,
  handleUnfilterMovies,
  handleSearchMovies
}) {

  const [inputText, setInputText] = useState('');
  const [valid, setValid] = useState(true);

  useEffect(() => {
    const searchText = JSON.parse(localStorage.getItem('searchText'));
    console.log(searchText);
    if (searchText) {
      setInputText(searchText);
    }
  }, [setInputText])

  function handleChange(e) {
    setInputText(e.target.value);
    setValid(e.target.checkValidity());
  }

  function searchMovies(e) {
    console.log(inputText);
    e.preventDefault();
    handleSearchMovies(inputText);
    // setInputText('');
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
        <span className='error'>{valid === true ? "" : "Нужно ввести ключевое слово"}</span>

        <FilterCheckbox
          handleFilterMovies={handleFilterMovies}
          handleUnfilterMovies={handleUnfilterMovies}
        />

      </div>
      <div className='line search-form__line'></div>
    </div>
  );
}

export default SearchForm;