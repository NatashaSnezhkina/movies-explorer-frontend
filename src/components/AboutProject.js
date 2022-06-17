import React from 'react';

function AboutProject() {
  return (
    <div className='about'>
      <h3 className='title'>О проекте</h3>
      <div className='line'></div>
      <div className='about__main-info'>
        <div className='about__info'>
          <h4 className='about__subtitle'>Дипломный проект включал 5 этапов</h4>
          <p className='about__description'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className='about__info'>
          <h4 className='about__subtitle'>На выполнение диплома ушло 5 недель</h4>
          <p className='about__description'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <div className='about__timeline'>
        <div className='about__timeline-part'>
          <div className='about__green-part'>1 неделя</div>
          <h5 className='about__timeline-subtitle'>Back-end</h5>
        </div>
        <div className='about__timeline-part'>
          <div className='about__gray-part'>4 недели</div>
          <h5 className='about__timeline-subtitle'>Front-end</h5>
        </div>
      </div>
    </div>
  )
}

export default AboutProject;