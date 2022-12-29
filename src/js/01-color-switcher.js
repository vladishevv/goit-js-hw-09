const btnStartEll = document.querySelector('button[data-start]');

const btnStopEll = document.querySelector('button[data-stop]');

const bodyEll = document.querySelector('body');

let bgcTimer = null;

btnStartEll.addEventListener('click', onChangeColor);
btnStopEll.addEventListener('click', offChangeColor);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

console.log(bodyEll.style.backgroundColor);

function onChangeColor() {
  btnStartEll.setAttribute('disabled', 'true');
  btnStopEll.removeAttribute('disabled');
  bgcTimer = setInterval(() => {
    bodyEll.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function offChangeColor() {
  btnStartEll.removeAttribute('disabled');
  btnStopEll.setAttribute('disabled', 'true');
  clearInterval(bgcTimer);
}
