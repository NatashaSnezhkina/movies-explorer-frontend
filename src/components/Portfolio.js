import React from 'react';

function Portfolio() {
  return (
    <div className='portfolio'>
      <h3 className='portfolio__title'>Портфолио</h3>
      <div className='portfolio__list'>
        <a className='portfolio__link' href='https://github.com/NatashaSnezhkina'>Статичный сайт</a>
        <a className='portfolio__arrow' href='https://github.com/NatashaSnezhkina'>↗</a>
      </div>
      <div className='line portfolio__line'></div>
      <div className='portfolio__list'>
        <a className='portfolio__link' href='https://github.com/NatashaSnezhkina'>Адаптивный сайт</a>
        <a className='portfolio__arrow' href='https://github.com/NatashaSnezhkina'>↗</a>
      </div>
      <div className='line portfolio__line'></div>
      <div className='portfolio__list'>
        <a className='portfolio__link' href='https://github.com/NatashaSnezhkina'>Одностраничное приложение</a>
        <a className='portfolio__arrow' href='https://github.com/NatashaSnezhkina'>↗</a>
      </div>
    </div>
  )
}

export default Portfolio;