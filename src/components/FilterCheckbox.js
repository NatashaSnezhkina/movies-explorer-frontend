import React, { useState, useEffect } from 'react';

function FilterCheckbox({
  handleFilterMovies,
  handleUnfilterMovies,
  isSaved
}) {

  const [isFiltered, setIsFiltered] = useState(false);

  function filterFilm() {
    if (isFiltered === false) {
      setIsFiltered(true);
      handleFilterMovies(true);
    } else {
      setIsFiltered(false);
      handleUnfilterMovies(false);
    }
  }

  useEffect(() => {
    if (isSaved) {
      setIsFiltered(false);
    } else {
      const checkboxStatus = JSON.parse(localStorage.getItem('filterCheckbox'));
      setIsFiltered(checkboxStatus);
    }
  })

  return (
    <div className='filter-checkbox'>
      <button
        className={`${isFiltered === true
          ? 'filter-checkbox__button_active'
          : 'filter-checkbox__button'}`}
        onClick={filterFilm}>
      </button>
      <p className='filter-checkbox__name'>Короткометражки</p>
    </div>
  );
}

export default FilterCheckbox;