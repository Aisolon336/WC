
const worker = document.getElementById('worker');
const toilet = document.getElementById('toilet');
const obstacles = document.querySelectorAll('.obstacle');
const restartBtn = document.getElementById('restartBtn');
const timerDisplay = document.getElementById('timer');

const startSound = document.getElementById('startSound');
const collisionSound = document.getElementById('collisionSound');
const winSound = document.getElementById('winSound');
const timeoutSound = document.getElementById('timeoutSound');

let x = 50;
let timeLeft = 30;
let timer;
let gameActive = true;

function checkCollision(newX) {
  for (let obs of obstacles) {
    const obsX = parseInt(obs.style.left);
    if (newX + 50 > obsX && newX < obsX + 50) {
      collisionSound.play();
      return true;
    }
  }
  return false;
}

function updatePosition() {
  worker.style.left = x + 'px';
  toilet.style.left = x + 'px';
}

document.addEventListener('keydown', (e) => {
  if (!gameActive) return;
  let newX = x;
  if (e.key === 'ArrowRight') newX += 10;
  if (e.key === 'ArrowLeft') newX -= 10;

  if (!checkCollision(newX)) {
    x = newX;
    updatePosition();
  }

  if (x > window.innerWidth - 60) {
    winSound.play();
    alert('WC erfolgreich transportiert!');
    gameActive = false;
    clearInterval(timer);
  }
});

function startTimer() {
  timerDisplay.textContent = 'Zeit: ' + timeLeft;
  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = 'Zeit: ' + timeLeft;
    if (timeLeft <= 0) {
      timeoutSound.play();
      alert('Zeit abgelaufen! Spiel vorbei.');
      clearInterval(timer);
      gameActive = false;
    }
  }, 1000);
}

restartBtn.addEventListener('click', () => {
  x = 50;
  timeLeft = 30;
  gameActive = true;
  updatePosition();
  clearInterval(timer);
  startSound.play();
  startTimer();
});

startSound.play();
startTimer();
