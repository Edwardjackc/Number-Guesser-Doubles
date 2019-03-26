/*---------- Query Selectors -----------*/
/*---------- Input Var.      -----------*/
var inputRangeMin = document.querySelector('#input-minrange');
var inputRangeMax = document.querySelector('#input-maxrange');
var inputNameCh1 = document.querySelector('#input-name-challenger1');
var inputNameCh2 = document.querySelector('#input-name-challenger2');
var inputGuessCh1 = document.querySelector('#input-guess-challenger1');
var inputGuessCh2 = document.querySelector('#input-guess-challenger2');
var inputAll = document.querySelectorAll('input');
/*--------- Output Var -----------------*/
var outputRangeMin = document.querySelector('#range-min');
var outputRangeMax = document.querySelector('#range-max');
var outputNameCh1 = document.querySelector('#name-output-challenger1');
var outputNameCh2 = document.querySelector('#name-output-challenger2');
var outputGuessCh1 = document.querySelector('#guess-output-challenger1');
var outputGuessCh2 = document.querySelector('#guess-output-challenger2');
var outputHighLow1 = document.querySelector('#guess-output-high-low1');
var outputHighLow2 = document.querySelector('#guess-output-high-low2');
/*--------- Buttons --------------------*/
var btnUpdateRange = document.querySelector('#btn-update');
var btnSubmit = document.querySelector('#btn-submit');
var btnReset = document.querySelector('#btn-reset');
var btnClear = document.querySelector('#btn-clear');
var btnAll = document.querySelector('button');
var btnHideCard = document.querySelector('.fa-times-circle');
/*---------- HTML Elements -------------*/
var asideColumn = document.querySelector('aside');
var formUpdateRange = document.querySelector('#form-range');
var formChallenger = document.querySelector('#form-challenger');
var winnerCard =  document.querySelector('section')
/*---------- Global Variables ----------*/
var outputWinner;
var randomNum;
let minNumber = parseInt(inputRangeMin.value) || 1;
let maxNumber = parseInt(inputRangeMax.value) || 100;
let timer = 0;
var guessCounter = 1;

/*---------- Event Listeners -----------*/
btnUpdateRange.addEventListener('click', updateRange);
btnSubmit.addEventListener('click', playGame);
// btnHideCard.addEventListener('click', deleteCard);
// btnReset.addEventListener('keydown' toggleReset)
// btnReset.addEventListener('click', resetGame); 
btnClear.addEventListener('click', resetChallengerForm);
// btnClear.addEventListener('keydown', toggleClear);
inputGuessCh1.addEventListener('keydown', validateRange);
inputGuessCh2.addEventListener('keydown', validateRange);
inputGuessCh1.addEventListener('keyup', toggleDisabledReset)
inputGuessCh1.addEventListener('keyup', toggleDisabledClear)
inputGuessCh2.addEventListener('keyup', toggleDisabledReset)
inputGuessCh2.addEventListener('keyup' toggleDisabledClear)
inputRangeMax.addEventListener('keydown', validateRange);
inputRangeMin.addEventListener('keydown', validateRange);
inputNameCh1.addEventListener('keydown', validateForAlphaNumeric);
inputNameCh2.addEventListener('keydown', validateForAlphaNumeric);
asideColumn.addEventListener('click', deleteCard);





/*---------- Functions -----------------*/



function toggleDisabledReset() {
   if (inputGuessCh1.value != '' || inputNameCh2.value != '' || inputGuessCh1.value != '' || inputGuessCh2.value != '')
  {
    btnReset.removeAttribute('disabled')
  } else {
    btnReset.setAttribute('enabled')

   }
  }


function toggleDisabledClear() {
   if (inputGuessCh1.value != '' || inputNameCh2.value != '' || inputGuessCh1.value != '' || inputGuessCh2.value != '')
  {
    btnClear.removeAttribute('disabled')
  } else {
    btnClear.setAttribute('enabled')
   }
  }

function makeRandomNumber(min, max) {
  if(minNumber<=0){
    minNumber = 1
  }
  return randomNum = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
  console.log(randomNum)
}

function validateRange(e){
  var regexCharNum = /[\d\t\n\r]/;
  if (e.key === 'Backspace' || regexCharNum.test(e.key)){
  } else {
    e.preventDefault();
  }
}

function validateForAlphaNumeric(e){
  var regexChar = /[\w\t\n\r]/;
  if (e.key === 'Backspace' || regexChar.test(e.key)){
  } else {
    e.preventDefault();
  }
}


function updateRange(e) {
  e.preventDefault();
  minNumber = parseInt(inputRangeMin.value);
  maxNumber = parseInt(inputRangeMax.value);
  makeRandomNumber();
  changeDOMRange();
  formUpdateRange.reset();
};

function changeDOMRange(){
  outputRangeMin.innerText = minNumber;
  outputRangeMax.innerText = maxNumber;
  console.log(randomNum);
}

function checkGuess(inputGuess) {
  //determines which user we're checking
  let outputHighLow = outputHighLow1;
  let inputName = inputNameCh1;
  if(inputGuess.id === inputGuessCh2.id){
    outputHighLow = outputHighLow2;
    inputName = inputNameCh2;
  } 
  if(inputGuess.value == randomNum) { 
    winner(outputHighLow, inputName)
    guessCounter = 0;
    increaseDifficulty()
  } else if (inputGuessCh2.value < randomNum) {
    tooLow(outputHighLow)
    guessCounter ++;
  } else { 
    tooHigh(outputHighLow);
    guessCounter ++;
    }
}

function tooLow(outputHighLow){
  outputHighLow.innerText = 'that\'s too low';
}

function tooHigh(outputHighLow){
    outputHighLow.innerText = 'that\'s too high';
}

function winner(outputHighLow, inputName){
  outputWinner = inputName.value;
  outputHighLow.innerText = 'BOOM';
  appendCard();
}

function resetChallengerForm(e){
  e.preventDefault();
  formChallenger.reset();
};

function playGame(e) {
  e.preventDefault();
  displayNames();
  checkGuess(inputGuessCh1);
  checkGuess(inputGuessCh2);
}; 


function displayNames(){
  outputNameCh1.innerText = inputNameCh1.value || 'Challenger 1';
  outputGuessCh1.innerText = inputGuessCh1.value || '--';
  outputNameCh2.innerText = inputNameCh2.value || 'Challenger 2';
  outputGuessCh2.innerText = inputGuessCh2.value || '--';
}

function addError(input) {
  if(inputAll = ''){
    input.classList.add('error');
    return
  }else{
    input.classList.remove('error');
  }
}

function appendCard(){
  asideColumn.innerHTML += `<section class="card-winner">
      <div class="versus-challenger">
        <p class="card-output-ch1">${inputNameCh1.value || `Challenger 1`}</p>
        <p class="vs-style">VS</p>
        <p class="card-output-ch2">${inputNameCh2.value || `Challenger 2`}</p>
      </div>
      <hr>
      <div class="card-output-results">
        <h2 class="winner">${outputWinner || 'Challenger'}</h2>
        <p class="card-style-winner">Winner</p>
      </div>
      <hr>
      <div class="card-bottom-wrapper">
        <p><span class="card-num-guess">${guessCounter} </span>Guesses</p>
        <p><span class="card-min">${timer} </span>Seconds</p>
        <i class="fas fa-times-circle delete"></i>
      </div>
    </section>`
      makeRandomNumber();
      console.log(randomNum);
      clearInterval(timer)
      timer = 0;
}

function increaseDifficulty(){
  minNumber = minNumber -10;
  maxNumber = maxNumber +10;
  if (minNumber <= 0){
    outputRangeMin.innerText = 1;
    outputRangeMax.innerText = maxNumber;
  }else{
  outputRangeMin.innerText = minNumber;
  outputRangeMax.innerText = maxNumber;
  }
}

function deleteCard(e){
  if (e.target.classList.contains('delete')){
    e.target.closest('section').remove();
  }
}

function startClock(){
  setInterval(()=>timer++, 1000)
}

window.onload = makeRandomNumber();
window.onload = startClock();
console.log(randomNum);