import Notiflix from 'notiflix';

const formEll = document.querySelector('.form');
const delayEll = document.querySelector('[name="delay"]');
const stepEl = document.querySelector('[name="step"]');
const amountEll = document.querySelector('[name="amount"]');

formEll.addEventListener('submit', e => {
  e.preventDefault();
  let delay = Number(delayEll.value);
  let step = Number(stepEl.value);
  let amount = Number(amountEll.value);

  for (let i = 1; i <= amount; i += 1) {
    createPromise({ position: i, delay: delay })
      .then(result => Notiflix.Notify.success(result))
      .catch(error => Notiflix.Notify.failure(error));
    delay += step;
  }
});

const createPromise = ({ position, delay }) => {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        // Reject
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
};
