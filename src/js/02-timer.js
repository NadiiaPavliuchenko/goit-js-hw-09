import flatpickr from 'flatpickr';
import Notiflix from 'notiflix/build/notiflix-notify-aio';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  input: document.querySelector('input#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  values: document.querySelectorAll('.value'),
};

const today = new Date();
let timerId;

const fp = flatpickr(refs.input, {
  enableTime: true,
  time_24hr: true,
  defaultDate: today,
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < today.getTime()) {
      Notiflix.Notify.init({});
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      refs.startBtn.removeAttribute('disabled');
    }
  },
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

refs.startBtn.addEventListener('click', () => {
  startTimer();

  timerId = setInterval(startTimer, 1000);
});

function startTimer() {
  const timeLeft = convertMs(
    fp.selectedDates[0].getTime() - new Date().getTime()
  );
  console.log(new Date().getTime());
  const keys = Object.keys(timeLeft);
  refs.values.forEach((value, index) => {
    value.textContent = addLeadingZero(timeLeft[keys[index]].toString());
  });

  if (
    timeLeft.days === 0 &&
    timeLeft.hours === 0 &&
    timeLeft.minutes === 0 &&
    timeLeft.seconds === 0
  ) {
    clearInterval(timerId);
  }
}

function addLeadingZero(content) {
  if (content.length < 2) {
    return content.padStart(2, '0');
  } else {
    return content;
  }
}
