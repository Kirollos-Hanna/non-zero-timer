let timer = document.querySelector(".timer");
let task = document.querySelector(".task");
let currentTask = document.querySelector(".current-task");

timer.innerText = 0;

let ShowCurrentTask = () => {
  currentTask.innerText = task.value;
};

let Ding = () => {
  let audio = new Audio('ding2.wav');
  audio.play();
};

let time = setInterval(() => {
  timer.innerText = parseInt(timer.innerText) + 1;
  if(parseInt(timer.innerText) >= 1800){
    timer.innerText = 0;
    ShowCurrentTask();
    Ding();
  }
}, 1000);
