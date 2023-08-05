export const timer = (elem, deadline) => {
  const createElements = () => {
    elem.innerHTML = `
      <p class="main-promotion__timer-title">
        До конца акции:
          </p>
          <div class="timer-wrapper">
              <p class="timer__item timer__item--days">
                <span class="big-numbers">3</span>
                <span class="medium-text">дня</span>
              </p>
              <p class="timer__item timer__item--hours">
                <span class="big-numbers">8</span>
                <span class="medium-text">часов</span>
              </p>
              <p class="timer__item timer__item--minutes">
                <span class="big-numbers">43</span>
                <span class="medium-text">минуты</span>
              </p>
              <p class="timer__item timer__item--seconds visually-hidden">
                  <span class="big-numbers">43</span>
                  <span class="medium-text">секунд</span>
                </p>
            </div>
          `
  };

  const getTimeRemaining = () => {

    const dateStop = new Date(deadline).getTime();
    const dateNow = Date.now();
    const timeRemaring = dateStop - dateNow;

    // секунды
    const seconds = Math.floor(timeRemaring / 1000 % 60);
    // минуты
    const minutes = Math.floor(timeRemaring / 1000 / 60 % 60);
    // часы
    const hours = Math.floor(timeRemaring / 1000 / 60 / 60 % 24);
    // дни
    const days = Math.floor((timeRemaring / 1000 / 60 / 60) / 24);

    return { timeRemaring, seconds, minutes, hours, days }
  }

  // функция склонения текста
  const decOfNum = (number, titles) => {
    let decCache = [],
      decCases = [2, 0, 1, 1, 1, 2];
    if (!decCache[number]) decCache[number] = number % 100 > 4 && number % 100 < 20 ? 2 : decCases[Math.min(number % 10, 5)];

    return titles[decCache[number]];
  }

  const start = (
    timerDays,
    timerHours,
    timerMinutes,
    timerSeconds,
    textDays,
    textHours,
    textMinutes,
    textSeconds,
    blockDays,
    blockSeconds,
    blockAllTimer
  ) => {

    const newTimer = getTimeRemaining();

    timerDays.textContent = newTimer.days;
    timerHours.textContent = newTimer.hours;
    timerMinutes.textContent = newTimer.minutes;
    timerSeconds.textContent = newTimer.seconds;

    textDays.textContent = decOfNum(timerDays.textContent, ['день', 'дня', 'дней']);
    textHours.textContent = decOfNum(timerHours.textContent, ['час', 'часа', 'часов']);
    textMinutes.textContent = decOfNum(timerMinutes.textContent, ['минуты', 'минуты', 'минут']);
    textSeconds.textContent = decOfNum(timerSeconds.textContent, ['секунда', 'секунды', 'секунд']);

    if (newTimer.days === 0) {
      blockDays.classList.add('visually-hidden');
      blockSeconds.classList.remove('visually-hidden');
    } else if (newTimer.days >= 1) {
      blockDays.classList.remove('visually-hidden');
      blockSeconds.classList.add('visually-hidden');
    } else if (newTimer.days < 0) {
      blockAllTimer.classList.add('visually-hidden');

      document.querySelector('.title_size_1').textContent = 'Акция закончилась, сорян((';
    };

    const intervalId = setTimeout(getElements, 1000);
  }

  const getElements = () => {

    if (!elem.hasChildNodes()) {
      createElements();
    }

    const timerDays = document.querySelector('.timer__item--days .big-numbers');
    const timerHours = document.querySelector('.timer__item--hours .big-numbers');
    const timerMinutes = document.querySelector('.timer__item--minutes .big-numbers');
    const timerSeconds = document.querySelector('.timer__item--seconds .big-numbers');

    const textDays = document.querySelector('.timer__item--days .medium-text');
    const textHours = document.querySelector('.timer__item--hours .medium-text');
    const textMinutes = document.querySelector('.timer__item--minutes .medium-text');
    const textSeconds = document.querySelector('.timer__item--seconds .medium-text');

    const blockDays = document.querySelector('.timer__item--days');
    const blockSeconds = document.querySelector('.timer__item--seconds');

    const blockAllTimer = document.querySelector('.main-promotion__timer');

    start(
      timerDays,
      timerHours,
      timerMinutes,
      timerSeconds,
      textDays,
      textHours,
      textMinutes,
      textSeconds,
      blockDays,
      blockSeconds,
      blockAllTimer
    );
  };

  getElements();
};