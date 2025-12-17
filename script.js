// ================= script.js =================
let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let running = false;
let lapCount = 1;


const display = document.getElementById('display');
const startPauseBtn = document.getElementById('startPause');
const lapBtn = document.getElementById('lap');
const resetBtn = document.getElementById('reset');
const lapList = document.getElementById('lapList');


function formatTime(ms) {
const totalSeconds = Math.floor(ms / 1000);
const minutes = Math.floor(totalSeconds / 60);
const seconds = totalSeconds % 60;
const milliseconds = Math.floor((ms % 1000) / 10);


return (
String(minutes).padStart(2, '0') + ':' +
String(seconds).padStart(2, '0') + ':' +
String(milliseconds).padStart(2, '0')
);
}


function startPause() {
if (!running) {
running = true;
startTime = Date.now() - elapsedTime;
timerInterval = setInterval(() => {
elapsedTime = Date.now() - startTime;
display.textContent = formatTime(elapsedTime);
}, 10);


startPauseBtn.textContent = 'Pause';
startPauseBtn.className = 'pause';
lapBtn.disabled = false;
resetBtn.disabled = false;
} else {
running = false;
clearInterval(timerInterval);
startPauseBtn.textContent = 'Start';
startPauseBtn.className = 'start';
}
}


function reset() {
running = false;
clearInterval(timerInterval);
elapsedTime = 0;
display.textContent = '00:00:00';
lapList.innerHTML = '';
lapCount = 1;
startPauseBtn.textContent = 'Start';
startPauseBtn.className = 'start';
lapBtn.disabled = true;
resetBtn.disabled = true;
}


function lap() {
if (running) {
const li = document.createElement('li');
li.textContent = `Lap ${lapCount} – ${formatTime(elapsedTime)}`;
lapList.appendChild(li);
lapCount++;
}
}


startPauseBtn.addEventListener('click', startPause);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);