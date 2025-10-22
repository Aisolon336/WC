let worker = document.getElementById('worker');
let toilet = document.getElementById('toilet');
let obstaclesContainer = document.getElementById('obstacles');
let levelDisplay = document.getElementById('levelDisplay');
let timerDisplay = document.getElementById('timerDisplay');

let x = 50, y = 200;
let level = parseInt(localStorage.getItem('level')) || 1;
let timeLeft = parseInt(localStorage.getItem('timeLeft')) || 30;
let timerInterval;

const levels = {
  1: [300, 500],
  2: [250, 400, 600],
  3: [200, 350, 500, 650]
};

function placeObstacles() {
  obstaclesContainer.innerHTML = '';
  levels[level].forEach(pos => {
    let obs = document.createElement('div');
    obs.style.left = pos + 'px';
    obs.style.top = '200px';
    obstaclesContainer.appendChild(obs);
  });
}

function updatePosition() {
  worker.style.left = x + 'px';
  worker.style.top = y + 'px';
  toilet.style.left = x + 'px';
  toilet.style.top = (y + 60) + 'px';
}

function checkCollision() {
  let collided = false;
  levels[level].forEach(pos => {
    if (x >= pos && x <= pos + 50 && y === 200) {
      collided = true;
    }
  });
  return collided;
}

function nextLevel() {
  level++;
  if (level > 3) {
    alert('Alle Level geschafft!');
    level = 1;
  } else {
    alert('Level geschafft!');
  }
  x = 50;
  y = 200;
  timeLeft = 30;
  localStorage.setItem('level', level);
  localStorage.setItem('timeLeft', timeLeft);
  levelDisplay.textContent = 'Level: ' + level;
  timerDisplay.textContent = 'Zeit: ' + timeLeft;
  placeObstacles();
  updatePosition();
}

function restartGame() {
  level = 1;
  timeLeft = 30;
  x = 50;
  y = 200;
  localStorage.setItem('level', level);
  localStorage.setItem('timeLeft', timeLeft);
  levelDisplay.textContent = 'Level: ' + level;
  timerDisplay.textContent = 'Zeit: ' + timeLeft;
  placeObstacles();
  updatePosition();
  clearInterval(timerInterval);
  startTimer();
}

function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = 'Zeit: ' + timeLeft;
    localStorage.setItem('timeLeft', timeLeft);
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      alert('Zeit abgelaufen!');
    }
  }, 1000);
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') x += 10;
  if (e.key === 'ArrowLeft') x -= 10;
  if (e.key === 'ArrowUp') y -= 10;
  if (e.key === 'ArrowDown') y += 10;

  if (checkCollision()) {
    x -= 10;
    alert('Kollision mit Hindernis!');
  }

  updatePosition();

  if (x > window.innerWidth - 60) {
    nextLevel();
  }
});

levelDisplay.textContent = 'Level: ' + level;
timerDisplay.textContent = 'Zeit: ' + timeLeft;
placeObstacles();
updatePosition();
startTimer();
