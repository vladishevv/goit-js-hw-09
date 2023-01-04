import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  datetime: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('[data-start]'),
  dataDays: document.querySelector('[data-days]'),
  dataHours: document.querySelector('[data-hours]'),
  dataMinutes: document.querySelector('[data-minutes]'),
  dataSeconds: document.querySelector('[data-seconds]'),
};

refs.btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      Notify.failure('Please choose a date in the future');
    } else {
      refs.btnStart.disabled = false;
    }
  },
};

const datetimePicker = flatpickr('#datetime-picker', options);

class TimerCountDown {
  constructor({ onCount }) {
    this.intervalId = null;
    this.isActive = false;
    this.onCount = onCount;
  };

  start() {
    if (this.isActive) {
      return;
    }
    const startTime = datetimePicker.selectedDates[0].getTime();
    this.isActive = true;

    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = startTime - currentTime;
      const time = this.convertMs(deltaTime);
      this.onCount(time);

      if (deltaTime > 1000) {
        refs.btnStart.disabled = true;
      } else {
        clearInterval(this.intervalId);
      }
    }, 1000);
  };
  convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = this.addLeadingZero(Math.floor(ms / day));
  const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = this.addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = this.addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
  };
  
  addLeadingZero(value) {
  return String(value).padStart(2, '0');
};
};

const timer = new TimerCountDown({
  onCount: updateClockFace,
});

refs.btnStart.addEventListener('click', timer.start.bind(timer));

function updateClockFace({ days, hours, minutes, seconds }) {
  refs.dataDays.textContent = `${days}`;
  refs.dataHours.textContent = `${hours}`;
  refs.dataMinutes.textContent = `${minutes}`;
  refs.dataSeconds.textContent = `${seconds}`;
};