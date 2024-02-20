import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { error, success } from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const startButton = document.getElementById('start-button');
const dateTimePicker = document.getElementById('datetime-picker');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');
const timerContainer = document.querySelector('.timer');

let countdownInterval;
let userSelectedDate;

function updateTimer(deadline) {
  const currentTime = new Date().getTime();
  const timeDifference = deadline - currentTime;

  if (timeDifference <= 0) {
    clearInterval(countdownInterval);
    timerContainer.style.display = 'none';
    iziToast.error({
      title: 'Error',
      message: 'Timer is ended',
    });
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(timeDifference);

  daysElement.textContent = addLeadingZero(days);
  hoursElement.textContent = addLeadingZero(hours);
  minutesElement.textContent = addLeadingZero(minutes);
  secondsElement.textContent = addLeadingZero(seconds);
}

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

function addLeadingZero(value) {
  return value < 10 ? `0${value}` : value;
}

function startTimer() {
  if (!userSelectedDate || userSelectedDate.getTime() <= new Date().getTime()) {
    iziToast.error({
      title: 'Error',
      message: 'Please choose a date in the future',
    });
    return;
  }

  const deadline = userSelectedDate.getTime();

  timerContainer.style.display = 'block';
  startButton.disabled = true;
  dateTimePicker.disabled = true; //
  updateTimer(deadline);
  countdownInterval = setInterval(() => {
    updateTimer(deadline);
  }, 1000);
}

flatpickr('#datetime-picker', {
  enableTime: true,
  dateFormat: 'Y-m-d H:i',
  time_24hr: true,
  minuteIncrement: 1,

  onClose: function (selectedDates) {
    userSelectedDate = selectedDates[0];
    if (
      !userSelectedDate ||
      userSelectedDate.getTime() <= new Date().getTime()
    ) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
});

startButton.addEventListener('click', startTimer);
