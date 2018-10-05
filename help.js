let timeLimit = document.querySelector(".time-limit");
let timeLimitBtn = document.querySelector(".time-limit-set-btn");
let timeLimitNote = document.querySelector(".time-limit-note");
let port = chrome.extension.connect({
    name: "Timer Communication"
});

timeLimitNote.style.display = "none";

timeLimitBtn.addEventListener("click", () => {
    port.postMessage({limit: timeLimit.value});
    timeLimitNote.style.display = "inline";
});
