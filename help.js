let timeLimit = document.querySelector(".time-limit");
let timeLimitBtn = document.querySelector(".time-limit-set-btn");
let timeLimitNote = document.querySelector(".time-limit-note");
let timeOption = document.querySelector(".time-options");
let port = chrome.extension.connect({
    name: "Timer Communication"
});

timeLimitNote.style.display = "none";

timeLimitBtn.addEventListener("click", () => {
    console.log(timeOption.value);
    if(timeOption.value === "minutes"){
      port.postMessage({limit: parseInt(timeLimit.value) * 60});
    } else {
      port.postMessage({limit: timeLimit.value});
    }
    if(timeLimit.value){
      timeLimitNote.style.display = "inline";
    }
});
