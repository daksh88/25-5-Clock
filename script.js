let session = 'work';
let seconds = 25 * 60;
let timer;
let isActive = false;

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function toggleTimer() {
  if (!isActive) {
    timer = setInterval(updateTime, 1000);
    document.getElementById('startPause').textContent = 'Pause';
  } else {
    clearInterval(timer);
    document.getElementById('startPause').textContent = 'Start';
  }
  isActive = !isActive;
}

function resetTimer() {
  clearInterval(timer);
  document.getElementById('startPause').textContent = 'Start';
  seconds = session === 'work' ? 25 * 60 : 5 * 60;
  updateDisplay();
  updateProgress();
  isActive = false;
}

function switchSession() {
  if (session === 'work') {
    session = 'break';
    seconds = 5 * 60;
  } else {
    session = 'work';
    seconds = 25 * 60;
  }
  updateDisplay();
  updateProgress();
}

function updateTime() {
  if (seconds > 0) {
    seconds--;
    updateDisplay();
    updateProgress();
  } else {
    switchSession();
  }
}

function updateDisplay() {
  document.getElementById('session').textContent = session.charAt(0).toUpperCase() + session.slice(1);
  document.getElementById('time').textContent = formatTime(seconds);
}

function updateProgress() {
  const totalSeconds = session === 'work' ? 25 * 60 : 5 * 60;
  const percentage = (seconds / totalSeconds) * 100;
  document.getElementById('progressCircle').style.background = `conic-gradient(#ACB6E5 ${percentage}%, transparent ${percentage}%)`;
}

document.getElementById('startPause').addEventListener('click', toggleTimer);
document.getElementById('reset').addEventListener('click', resetTimer);
document.getElementById('switch').addEventListener('click', switchSession);

updateDisplay();
updateProgress();
