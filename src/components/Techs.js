import React from 'react';

function Techs() {
  return (
    <div className='techs'>
      <h3 className='title'>Технологии</h3>
      <div className='line'></div>
      <h2 className='techs__headline'>7 технологий</h2>
      <p className='techs__description'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      <div className='techs__list'>
        <div className='techs__item'>HTML</div>
        <div className='techs__item'>CSS</div>
        <div className='techs__item'>JS</div>
        <div className='techs__item'>React</div>
        <div className='techs__item'>Git</div>
        <div className='techs__item'>Express.js</div>
        <div className='techs__item'>mongoDB</div>
      </div>
    </div>
  )
}

export default Techs;