let secondsRun = 0;
const minTimeEl = <HTMLInputElement>document.getElementById("minTime");
const maxTimeEl = <HTMLInputElement>document.getElementById("maxTime");
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const resetBtn = document.getElementById("reset");
const display = document.getElementById("timeRun");
minTimeEl.value = minTimeEl.value ? minTimeEl.value : "5";
let running = false;
const timerTemplate = (seconds: number) =>
  `${Math.floor(seconds / 60)} min ${String(seconds % 60).padStart(
    2,
    "0"
  )} sec`;
display.innerText = timerTemplate(secondsRun);
let intervalId: any;
let pausedAt = 0;

function startClock() {
  const startTime = new Date().getTime() / 1000;
  const minimumSeconds = parseFloat(minTimeEl.value) * 60;
  console.log(`Minimum Seconds: ${minimumSeconds}`);
  running = true;
  intervalId = setInterval(() => {
    if (running) {
      const now = new Date().getTime() / 1000;
      secondsRun = Math.floor(now - startTime) + pausedAt;
      display.innerText = timerTemplate(secondsRun);
      if (secondsRun > minimumSeconds) {
        document.body.style.backgroundColor = "green";
      } else {
        document.body.style.backgroundColor = "transparent";
      }
    }
  }, 1000);
}

function stopClock() {
  pausedAt = secondsRun;
  running = false;
  console.log(pausedAt);
  clearInterval(intervalId);
}

function resetClock() {
  secondsRun = 0;
  pausedAt = 0;
  display.innerText = timerTemplate(secondsRun);
}

startBtn?.addEventListener("click", startClock);
stopBtn?.addEventListener("click", stopClock);
resetBtn?.addEventListener("click", resetClock);
