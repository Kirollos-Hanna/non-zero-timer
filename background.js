let time = 0,
task = "",
audio = new Audio('assets/ding2.wav'),
pauseBtnState = false,
pausedState = false,
TIME_LIMIT = 1800;

let timer = () => {
  time += 1;
  if(time >= TIME_LIMIT){
    time = 0;
    if(!task){
      alert("Do Nothing!");
    } else {
      alert(task);
    }
    Ding();
  }
};
let timerInterval;

chrome.extension.onConnect.addListener(function(port) {
      port.postMessage({time: time, timeLimit: TIME_LIMIT, pauseBtnState: pauseBtnState, pausedState: pausedState});
      port.onMessage.addListener(function(msg) {
        if(msg.task){
          task = msg.task;
        }
        if(msg.limit){
          TIME_LIMIT = msg.limit;
          // if the time limit exceeds 3 hours in length or is lower than 5 minutes bring them to the appropriate level
          if(TIME_LIMIT < 300){
            TIME_LIMIT = 300;
          } else if(TIME_LIMIT > 10800){
            TIME_LIMIT = 10800;
          }
        }
        if(msg.pauseBtnState === false || msg.pauseBtnState === true){
          pauseBtnState = msg.pauseBtnState;
          port.postMessage({pauseBtnState: pauseBtnState});
        }
        if(msg.pausedState === false || msg.pausedState === true){
          console.log(msg.pausedState);
          pausedState = msg.pausedState;
          if(msg.pausedState){
            clearInterval(timerInterval);
          } else {
            timerInterval = setInterval(timer, 1000);
          }
        }
      });
});

let Ding = () => {
  audio.play();
};

timerInterval = setInterval(timer, 1000);
