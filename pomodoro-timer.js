let breakLengthValue;
let sessionLengthValue;
let minutesTimeLeftValue;
let secondsTimeLeftValue;

const breakLength = document.getElementById("break-length");
const breakDecrement = document.getElementById("break-decrement");
const breakIncrement = document.getElementById("break-increment");
let breakStart = false;

const sessionLength = document.getElementById("session-length");
const sessionDecrement = document.getElementById("session-decrement");
const sessionIncrement = document.getElementById("session-increment");

const timerLabel = document.getElementById("timer-label");
const timeLeft = document.getElementById("time-left");
let timerActive = false;

const startStop = document.getElementById("start_stop");
const reset = document.getElementById("reset");

let mycountDown;

const beep = document.getElementById("beep");

const buttons = document.querySelectorAll("button");

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function () {
    buttons[i].classList.add("active");
    setTimeout(() => buttons[i].classList.remove("active"), 150);
  });
}

window.onload = function () {
  resetValues();
};

function resetValues() {
  if (mycountDown !== undefined) clearInterval(mycountDown);
  beep.pause();
  beep.currentTime = 0;
  timerLabel.innerHTML = "Session";
  timerActive = false;
  breakLengthValue = 5;
  sessionLengthValue = 25;
  minutesTimeLeftValue = sessionLengthValue;
  secondsTimeLeftValue = 0;

  timeLeft.innerHTML = `${minutesTimeLeftValue}:${secondsTimeLeftValue}0`;
  breakLength.innerHTML = breakLengthValue;
  sessionLength.innerHTML = sessionLengthValue;
}

breakDecrement.addEventListener("click", function () {
  if (!timerActive) {
    if (breakLengthValue > 1) {
      breakLengthValue--;
    }
    breakLength.innerHTML = breakLengthValue;
  }
});

breakIncrement.addEventListener("click", function () {
  if (!timerActive) {
    if (breakLengthValue < 60) {
      breakLengthValue++;
    }
    breakLength.innerHTML = breakLengthValue;
  }
});

sessionDecrement.addEventListener("click", function () {
  if (!timerActive) {
    if (sessionLengthValue > 1) {
      sessionLengthValue--;
      minutesTimeLeftValue--;
      sessionLength.innerHTML = sessionLengthValue;
    }
    setTimerValue();
  }
});

sessionIncrement.addEventListener("click", function () {
  if (!timerActive) {
    if (sessionLengthValue < 60) {
      sessionLengthValue++;
      minutesTimeLeftValue++;
      sessionLength.innerHTML = sessionLengthValue;
    }
    setTimerValue();
  }
});

function setTimerValue() {
  if (breakStart) {
    timerLabel.innerHTML = "Break";
    minutesTimeLeftValue = breakLengthValue;
  } else {
    timerLabel.innerHTML = "Session";
    minutesTimeLeftValue = sessionLengthValue;
  }

  minutesTimeLeftValue =
    minutesTimeLeftValue < 10
      ? "0" + minutesTimeLeftValue
      : minutesTimeLeftValue;

  timeLeft.innerHTML = `${minutesTimeLeftValue}:00`;
}

reset.addEventListener("click", resetValues);
startStop.addEventListener("click", startStopTimer);

function startStopTimer() {
  timerActive = !timerActive;

  if (timerActive) {
    mycountDown = setInterval(() => {
      countDown();
    }, 1000);
  } else {
    clearInterval(mycountDown);
  }
}

function countDown() {
  let zeroMinutes = "";
  let zeroSeconds = "";

  if (secondsTimeLeftValue === 0) {
    secondsTimeLeftValue = 60;
    minutesTimeLeftValue--;
  }

  secondsTimeLeftValue--;

  if (minutesTimeLeftValue < 10) zeroMinutes = "0";
  if (secondsTimeLeftValue < 10) zeroSeconds = "0";

  timeLeft.innerHTML = `${zeroMinutes}${minutesTimeLeftValue}:${zeroSeconds}${secondsTimeLeftValue}`;

  if (minutesTimeLeftValue === 0 && secondsTimeLeftValue === 0) {
    clearInterval(mycountDown);
    beep.play();
    if (!breakStart) {
      breakStart = true;
      breakLengthValue = breakLength.innerHTML;
    } else {
      breakStart = false;
      sessionLengthValue = sessionLength.innerHTML;
    }
    setTimeout(() => {
      setTimerValue();
      timerActive = false;
      startStopTimer();
    }, 4000);
  }
}
