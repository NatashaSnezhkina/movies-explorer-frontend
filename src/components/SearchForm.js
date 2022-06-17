import React from 'react';
import FilterCheckbox from './FilterCheckbox';

function SearchForm() {
  return (
    <div className='search-form'>
      <div className='search-form__container'>
        <div className='search-form__search-line'>
          <input className='search-form__input' type='text' defaultValue='Фильм'></input>
          <button className='search-form__button'></button>
        </div>
        <FilterCheckbox />
      </div>
      <div className='line search-form__line'></div>
    </div>
  );
}

export default SearchForm;