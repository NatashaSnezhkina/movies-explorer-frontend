import React, {useState} from 'react';

function FilterCheckbox() {
  
  const [isClicked, setIsClicked] = useState(false);

  function handleClick() {
    setIsClicked(true);
  }

  return (
    <div className='filter-checkbox'>
      <button className={`${isClicked === true ? 'filter-checkbox__button_active' : 'filter-checkbox__button'}`} onClick={handleClick}></button>
      <p className='filter-checkbox__name'>Короткометражки</p>
    </div>
  );
}

export default FilterCheckbox;