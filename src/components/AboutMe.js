import React from 'react';
import myPhoto from '../images/myPhoto.jpg';

function AboutMe() {
  return (
    <section className='me'>
      <h3 className='title'>Студентка</h3>
      <div className='line'></div>
      <div className='me__info'>
        <div className='me__text'>
          <h2 className='me__name'>Наталия</h2>
          <h4 className='me__subtitle'>Фронтенд-разработчица, 21 год</h4>
          <p className='me__about'>
            Мне нравится создавать новое из ничего.
            В вебе меня очень привлекает получение быстрого видимого результата.
            Я закончила физ-мат школу, поэтому получаю большое удовольствие от нахождения оптимальных решений, придумывания логики.
            В web важно постоянно учиться новому, что я и делаю.
            Читаю документацию, статьи на Хабр, гуглю и смотрю разные видео на YouTube.
            А еще, я совмещаю работу с учебой с 18 лет, поэтому умею быстро и качественно выполнять задачи.</p>
          <div className='me__social-media'>
            <a className='me__link' href='https://www.linkedin.com/in/natalia-snezhkina/' target="_blank">LinkedIn</a>
            <a className='me__link' href='https://github.com/NatashaSnezhkina' target="_blank">GitHub</a>
          </div>
        </div>
        <img className='me__photo' src={myPhoto} alt='My_photo'></img>
      </div>
    </section>
  )
}

export default AboutMe;