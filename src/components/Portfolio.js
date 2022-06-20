import React from 'react';

function Portfolio() {
  return (
    <section className='portfolio'>
      <h3 className='portfolio__title'>Портфолио</h3>
      <div className='portfolio__list'>
        <a className='portfolio__link' href='https://github.com/NatashaSnezhkina' target="_blank">Статичный сайт</a>
        <a className='portfolio__arrow' href='https://github.com/NatashaSnezhkina' target="_blank">↗</a>
      </div>
      <div className='line portfolio__line'></div>
      <div className='portfolio__list'>
        <a className='portfolio__link' href='https://github.com/NatashaSnezhkina' target="_blank">Адаптивный сайт</a>
        <a className='portfolio__arrow' href='https://github.com/NatashaSnezhkina' target="_blank">↗</a>
      </div>
      <div className='line portfolio__line'></div>
      <div className='portfolio__list'>
        <a className='portfolio__link' href='https://github.com/NatashaSnezhkina' target="_blank">Одностраничное приложение</a>
        <a className='portfolio__arrow' href='https://github.com/NatashaSnezhkina' target="_blank">↗</a>
      </div>
    </section>
  )
}

export default Portfolio;