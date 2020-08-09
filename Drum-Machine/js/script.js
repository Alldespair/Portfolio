// 1. Get DOM elements

let loopPanel = document.querySelector('.drumLoop');
let columnsArray = document.querySelectorAll('.column-container'), columnsArraySize = columnsArray.length, k;

let playPauseBTN = document.querySelector('.buttonPlayPause');
let stopBTN =  document.querySelector('.buttonStop');
let clearBTN = document.querySelector('.buttonClear');
let plusBTN = document.querySelector('.buttonPlusBPM');
let currentBPM = document.querySelector('.currentBPM');
let minusBTN = document.querySelector('.buttonMinusBPM');

let crashSound = document.querySelector(`audio[data-key="69"]`);
    rideCapSound = document.querySelector(`audio[data-key="85"]`);
    tomHiSound = document.querySelector(`audio[data-key="68"]`);
    tomLowSound = document.querySelector(`audio[data-key="70"]`);
    hhOpenCapSound = document.querySelector(`audio[data-key="90"]`);
    hhCloseSound = document.querySelector(`audio[data-key="88"]`);
    snareSound = document.querySelector(`audio[data-key="67"]`);
    clapSound = document.querySelector(`audio[data-key="86"]`);
    kickSound = document.querySelector(`audio[data-key="66"]`);
    rimShotSound = document.querySelector(`audio[data-key="78"]`);

// 2. Create audio array

let audioArray = [crashSound, rideCapSound, tomHiSound,
                  tomLowSound, hhOpenCapSound,
                  hhCloseSound, snareSound, clapSound, kickSound,
                  rimShotSound];

// 3. Create sample array

let sampleBox = new Array(10), sampleBoxSize = sampleBox.length, i = 0, j;

let currentPanelElem, panelRow, panelCol;

// 4. Create helpers elements

let BPM = currentBPM.value;
let loopInterval;
let minute = 60;
let loopSteps = 4;

let currentStep = 0;
let totalSteps = 15

let currentPlay;
let prePlayingElem;
let prePlayingSound;
let playing;
let playingStatus;

// 5. applied addEventListener and mouseevents to buttons and created functions;

playPauseBTN.addEventListener('click', playStop);
stopBTN.addEventListener('click', stopFoo);
clearBTN.addEventListener('click', clearStatus);

plusBTN.onmousedown = function() {
  this.onmouseup = addBPM();
  let intervalBTN = setInterval(function() {addBPM()}, 150);
  this.onmouseup = function(){ clearInterval(intervalBTN);}
};

minusBTN.onmousedown = function() {
  this.onmouseup = subtractBTN();
  let intervalBTN = setInterval(function() {subtractBTN()}, 150);
  this.onmouseup = function(){ clearInterval(intervalBTN);}
};

// 6. function for clearing loop panel elements

function clearStatus() {
  for(i = 0; i < sampleBoxSize; i += 1) {
    sampleBox[i] = [];
    for(j = 0; j < 16; j += 1) {
      sampleBox[i][j] = false;
      columnsArray[i].children[j].style.backgroundColor = "#111111";
    }
  }
};

clearStatus();

// 7. function for loop panel elements change

loopPanel.addEventListener('click', function(e) {
  if(e.target.className === 'column') {
    currentPanelElem = e.target;
    panelRow = e.target.dataset.row;
    panelCol = e.target.dataset.col;
    prePlayingElem = e.target.parentNode.parentNode.querySelector(`div`).dataset.key;
    if(!sampleBox[panelRow][panelCol]) {
      sampleBox[panelRow][panelCol] = true;
      currentPanelElem.style.backgroundColor = "#ffc600";
      prePlayingSound = document.querySelector(`audio[data-key="${prePlayingElem}"]`);
      prePlayingSound.currentTime = 0;
      prePlayingSound.play();
    } else {
      sampleBox[panelRow][panelCol] = false;
      currentPanelElem.style.backgroundColor = "#111111";
    }
  }
});

// 8. function for calculating loop Interval

function calculateLoopInterval() {
  loopInterval = minute / BPM / loopSteps * 1000;
};

calculateLoopInterval();

// 9. functions to play and stop sample

function stopAudio() {
  playingStatus = false;
  clearInterval(playing);
};

function startAudio() {
  playingStatus = true;
  playing = window.setInterval(function() {
    playLoop();
    }, loopInterval);
};

function playLoop() {
if(currentStep > totalSteps){
  currentStep = 0;
}
for(j = 0; j < sampleBoxSize; j += 1) {
  for(k = 0; k < columnsArraySize; k += 1) {
    columnsArray[k].children[currentStep].style.borderColor = "#df1515";
    if(currentStep === 0) {
      columnsArray[k].children[totalSteps].style.borderColor = '#763232';
    } else {
      columnsArray[k].children[currentStep - 1].style.borderColor = '#763232';
    }
  }
  if(sampleBox[j][currentStep]) {
    audioArray[j].currentTime = 0;
    audioArray[j].play();
  }
}
  currentStep += 1;
};

function playStop() {
  if(playPauseBTN.value === 'Play') {
    startAudio();
    playPauseBTN.value = 'Pause';
  } else {
    stopAudio();
    playPauseBTN.value = 'Play';
  }
};

function stopFoo() {
  stopAudio();
  playPauseBTN.value = 'Play';
  for(i = 0; i < sampleBoxSize; i += 1) {
    for(j = 0; j < 16; j += 1) {
      columnsArray[i].children[j].style.borderColor = '#763232';
    }
  }
  currentStep = 0;
};

// 10. functions for BPM change

function addBPM() {
  if(currentBPM.value < 200) {
    currentBPM.value++;
    BPM = currentBPM.value;
    calculateLoopInterval();
    if(playingStatus) {
      stopAudio();
      startAudio()  
    }
  }
};

function subtractBTN() {
  if(currentBPM.value > 40) {
    currentBPM.value--;
    BPM = currentBPM.value;
    calculateLoopInterval();
    if(playingStatus) {
      stopAudio();
      startAudio()  
    }
  }
};

// 10. function to play current sound

function playSound(event) {
  const key = document.querySelector(`div[data-key="${event.keyCode}"]`);
  currentPlay = key
  const audio = document.querySelector(`audio[data-key="${event.keyCode}"]`);
  if(!audio) return;
  key.classList.add('playing');
  audio.currentTime = 0;
  audio.play();
  audio.addEventListener('ended', removeTransition(), 1000);
}

function removeTransition() {
  setTimeout(() => currentPlay.classList.remove('playing'), 200);
};

window.addEventListener('keydown', playSound);