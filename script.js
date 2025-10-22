let worker = document.getElementById('worker');
let toilet = document.getElementById('toilet');
let gameArea = document.getElementById('gameArea');
let levelDisplay = document.getElementById('levelDisplay');
let timerDisplay = document.getElementById('timerDisplay');
let highscoreDisplay = document.getElementById('highscoreDisplay');

let x = 50, y = 200;
let level = parseInt(localStorage.getItem('currentLevel')) || 1;
let timeLeft = parseInt(localStorage.getItem('timeLeft')) || 30;
let highscore = parseInt(localStorage.getItem('highscore')) || 0;
let timerInterval;

const levelObstacles = {
  1: [300],
  2: [300, 500],
  3: [300, 500, 700]
};

function updateDisplay() {
  levelDisplay.textContent = 'Aktuelles Level: ' + level;
  timerDisplay.textContent = 'Zeit: ' + timeLeft;
  highscoreDisplay.textContent = 'Highscore: Level ' + highscore;
}

function placeObstacles() {
  document.querySelectorAll('.obstacle').forEach(e => e.remove());
  let positions = levelObstacles[level] || [];
  positions.forEach(pos => {
    let obs = document.createElement('div');
    obs.className = 'obstacle';
    obs.style.left = pos + 'px';
    obs.style.top = '200px';
    gameArea.appendChild(obs);
  });
}

function restartGame() {
  x = 50;
  y = 200;
  level = 1;
  timeLeft = 30;
  localStorage.setItem('currentLevel', level);
  localStorage.setItem('timeLeft', timeLeft);
  updateDisplay();
  placeObstacles();
  worker.style.left = x + 'px';
  worker.style.top = y + 'px';
  toilet.style.left = x + 'px';
  toilet.style.top = (y + 60) + 'px';
  clearInterval(timerInterval);
  startTimer();
}

function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;
    localStorage.setItem('timeLeft', timeLeft);
    updateDisplay();
    if (timeLeft <= 0) {
      alert('Zeit abgelaufen!');
      clearInterval(timerInterval);
    }
  }, 1000);
}

document.addEventListener('keydown', (e) => {
  let newX = x, newY = y;
  if (e.key === 'ArrowRight') newX += 10;
  if (e.key === 'ArrowLeft') newX -= 10;
  if (e.key === 'ArrowUp') newY -= 10;
  if (e.key === 'ArrowDown') newY += 10;

  let blocked = false;
  document.querySelectorAll('.obstacle').forEach(obs => {
    let obsX = parseInt(obs.style.left);
    let obsY = parseInt(obs.style.top);
    if (Math.abs(newX - obsX) < 50 && Math.abs(newY - obsY) < 50) {
      blocked = true;
    }
  });

  if (!blocked && newX >= 0 && newX <= 750 && newY >= 0 && newY <= 350) {
    x = newX;
    y = newY;
    worker.style.left = x + 'px';
    worker.style.top = y + 'px';
    toilet.style.left = x + 'px';
    toilet.style.top = (y + 60) + 'px';
  }

  if (x > 750) {
    level++;
    if (level > highscore) {
      highscore = level;
      localStorage.setItem('highscore', highscore);
    }
    localStorage.setItem('currentLevel', level);
    timeLeft = 30;
    localStorage.setItem('timeLeft', timeLeft);
    updateDisplay();
    placeObstacles();
    x = 50;
    y = 200;
    worker.style.left = x + 'px';
    worker.style.top = y + 'px';
    toilet.style.left = x + 'px';
    toilet.style.top = (y + 60) + 'px';
    if (level > 3) {
      alert('Alle Level geschafft!');
      clearInterval(timerInterval);
    }
  }
});

updateDisplay();
placeObstacles();
worker.style.left = x + 'px';
worker.style.top = y + 'px';
toilet.style.left = x + 'px';
toilet.style.top = (y + 60) + 'px';
startTimer();
