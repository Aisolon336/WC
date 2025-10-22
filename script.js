const worker = document.getElementById('worker');
const toilet = document.getElementById('toilet');
const timerDisplay = document.getElementById('timer');
let x = 50;
let timeLeft = 30;
let gameOver = false;

document.addEventListener('keydown', (e) => {
  if (gameOver) return;

  if (e.key === 'ArrowRight') x += 10;
  if (e.key === 'ArrowLeft') x -= 10;

  worker.style.left = x + 'px';
  toilet.style.left = x + 'px';

  if (x > window.innerWidth - 60) {
    alert('WC erfolgreich transportiert!');
    resetGame();
  }
});

const countdown = setInterval(() => {
  if (timeLeft <= 0) {
    clearInterval(countdown);
    gameOver = true;
    alert('Zeit abgelaufen! Spiel vorbei.');
    return;
  }
  timeLeft--;
  timerDisplay.textContent = 'Zeit: ' + timeLeft;
}, 1000);

function resetGame() {
  x = 50;
  worker.style.left = x + 'px';
  toilet.style.left = x + 'px';
  timeLeft = 30;
  timerDisplay.textContent = 'Zeit: ' + timeLeft;
  gameOver = false;
}
