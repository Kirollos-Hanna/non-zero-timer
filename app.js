let timer = document.querySelector(".timer");
let task = document.querySelector(".task");
let currentTask = document.querySelector(".current-task");
let submitTaskBtn = document.querySelector(".submit-task");
let TIME_LIMIT = 0;
let port = chrome.extension.connect({
    name: "Timer Communication"
});

port.onMessage.addListener(function(msg) {
    timer.innerText = msg[0];
    TIME_LIMIT = msg[1];
});

submitTaskBtn.addEventListener("click", () => {
  port.postMessage({task: task.value});
  window.close();
});

// let ShowCurrentTask = () => {
//   currentTask.innerText = task.value;
// };

let clock = setInterval(() => {
  timer.innerText = parseInt(timer.innerText) + 1;
  if(parseInt(timer.innerText) >= TIME_LIMIT){
    timer.innerText = 0;
    // ShowCurrentTask();
  }
}, 1000);
