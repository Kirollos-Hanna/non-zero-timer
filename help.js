let timeLimit = document.querySelector(".time-limit");
let timeLimitBtn = document.querySelector(".time-limit-set-btn");
let port = chrome.extension.connect({
    name: "Timer Communication"
});

timeLimitBtn.addEventListener("click", () => {
    port.postMessage({limit: timeLimit.value});
});
