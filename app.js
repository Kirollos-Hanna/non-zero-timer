let timer = document.querySelector(".timer"),
task = document.querySelector(".task"),
submitTaskBtn = document.querySelector(".submit-task"),
pauseBtn = document.querySelector(".pause-btn"),
pausedState = false,
TIME_LIMIT = 0,
port = chrome.extension.connect({
    name: "Timer Communication"
});

let clock = () => {
  timer.innerText = parseInt(timer.innerText) + 1;
  if(parseInt(timer.innerText) >= TIME_LIMIT){
    timer.innerText = 0;
  }
};
let clockInterval;

function checkPausedState(){
  pauseBtn.innerText = pausedState? "Start":"Pause";
  if(pausedState){
    clearInterval(clockInterval);
  } else {
    clockInterval = setInterval(clock, 1000);
  }
}

port.onMessage.addListener(function(msg) {
  timer.innerText = "0";
  if(msg.time){
    timer.innerText = msg.time;
  }

  if(msg.timeLimit){
    TIME_LIMIT = msg.timeLimit;
  }

  if(msg.pauseBtnState){
    pauseBtn.style.display = "block";
  } else {
    pauseBtn.style.display = "none";
  }

  if(msg.pausedState){
    pausedState = msg.pausedState;
    checkPausedState();
  }
});

submitTaskBtn.addEventListener("click", () => {
  port.postMessage({task: task.value});
  window.close();
});

pauseBtn.addEventListener("click", () => {
  pausedState = !pausedState;
  port.postMessage({pausedState: pausedState});

  checkPausedState();
});

clockInterval = setInterval(clock, 1000);
