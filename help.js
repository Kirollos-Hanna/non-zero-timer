let timeLimit = document.querySelector(".time-limit"),
timeLimitBtn = document.querySelector(".time-limit-set-btn"),
timeLimitNote = document.querySelector(".time-limit-note"),
maxTimeLimitNote = document.querySelector(".max-time-limit-note"),
minTimeLimitNote = document.querySelector(".min-time-limit-note"),
timeOption = document.querySelector(".time-options"),
togglePauseBtn = document.querySelector(".toggle-pause-btn"),
pauseBtnState = false,
port = chrome.extension.connect({
    name: "Timer Communication"
});

let notesArray = [timeLimitNote, maxTimeLimitNote, minTimeLimitNote];
for(let i = 0; i < notesArray.length; i++){
  notesArray[i].style.display = "none";
}

port.onMessage.addListener(function(msg) {
  if(msg.pauseBtnState){
    togglePauseBtn.checked = true;
  } else {
    togglePauseBtn.checked = false;
  }
});

function displayNote(noteToShow){
  notesArray.map(note => note === noteToShow? note.style.display = "inline" : note.style.display = "none");
}

timeLimitBtn.addEventListener("click", () => {
    let timeInSeconds = timeOption.value === "minutes"? parseInt(timeLimit.value) * 60 : parseInt(timeLimit.value);

    if(timeInSeconds < 300){
      displayNote(minTimeLimitNote);
    } else if(timeInSeconds > 10800){
      displayNote(maxTimeLimitNote);
    } else if(timeInSeconds){
      port.postMessage({limit: timeInSeconds});
      displayNote(timeLimitNote);
    }

});

togglePauseBtn.addEventListener("click", () => {
  pauseBtnState = !pauseBtnState;
  port.postMessage({pauseBtnState: pauseBtnState});
});
