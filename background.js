let time = 0;
let task = "";
let audio = new Audio('assets/ding2.wav');
let TIME_LIMIT = 1800;

chrome.extension.onConnect.addListener(function(port) {
      port.postMessage([time, TIME_LIMIT]);
      port.onMessage.addListener(function(msg) {
        if(msg.task){
          task = msg.task;
        } else if(msg.limit){
          TIME_LIMIT = msg.limit;
          // if the time limit exceeds 3 hours in length or is lower than 5 minutes bring them to the appropriate level
          if(TIME_LIMIT < 300){
            TIME_LIMIT = 300;
          } else if(TIME_LIMIT > 10800){
            TIME_LIMIT = 10800;
          }
        }
      });
});

let Ding = () => {
  audio.play();
};

let timer = setInterval(() => {
  time += 1;
  if(time >= TIME_LIMIT){
    time = 0;
    if(!task){
      alert("Nothing!");
    } else {
      alert(task);
    }
    Ding();
  }
}, 1000);
