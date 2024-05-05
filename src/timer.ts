let secondsRun = 0;
const minTimeEl = <HTMLInputElement>document.getElementById("minTime");
const maxTimeEl = <HTMLInputElement>document.getElementById("maxTime");
const startBtn = <HTMLButtonElement>document.getElementById("start");
const stopBtn = <HTMLButtonElement>document.getElementById("stop");
const resetBtn = <HTMLButtonElement>document.getElementById("reset");
const display = <HTMLHeadingElement>document.getElementById("timeRun");
const passed = <HTMLDivElement>document.getElementById("timer-passed");
minTimeEl.value = minTimeEl.value ? minTimeEl.value : "5";
maxTimeEl.value = maxTimeEl.value ? maxTimeEl.value : "7";
passed.style.width = "0%";
let running = false;
const timerTemplate = (seconds: number) =>
  `- ${Math.floor(seconds / 60)} min ${String(seconds % 60).padStart(
    2,
    "0"
  )} sec -`;
display.innerText = timerTemplate(secondsRun);
let intervalId: any;
let pausedAt = 0;

function runClock() {
  const startTime = new Date().getTime() / 1000;
  const minimumSeconds = parseFloat(minTimeEl.value) * 60;
  const maximumSeconds = parseFloat(maxTimeEl.value) * 60;
  const averageSeconds = Math.floor((minimumSeconds + maximumSeconds) / 2);

  running = true;
  intervalId = setInterval(() => {
    if (running) {
      const now = new Date().getTime() / 1000;
      secondsRun = Math.floor(now - startTime) + pausedAt;
      display.innerText = timerTemplate(secondsRun);
      const percentDone = (secondsRun / maximumSeconds) * 100;
      passed.style.width = `${percentDone < 100 ? percentDone : 100}%`;
      if (secondsRun > maximumSeconds) {
        document.body.style.backgroundColor = "#cc3232";
      } else if (secondsRun >= averageSeconds) {
        document.body.style.backgroundColor = "#e7b416";
      } else if (secondsRun >= minimumSeconds) {
        document.body.style.backgroundColor = "#2dc937";
      } else {
        document.body.style.backgroundColor = "transparent";
      }
    }
  }, 1000);
}

function stopClock() {
  pausedAt = secondsRun;
  running = false;
  clearInterval(intervalId);
}

function resetClock() {
  secondsRun = 0;
  pausedAt = 0;
  passed.style.width = "0%";
  display.innerText = timerTemplate(secondsRun);
  document.body.style.backgroundColor = "transparent";
}

startBtn.addEventListener("click", runClock);
stopBtn.addEventListener("click", stopClock);
resetBtn.addEventListener("click", resetClock);
