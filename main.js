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

var error = document.querySelector('.hidden-error')
var errorName1 = document.querySelector('#name-error-1')
var errorName2 = document.querySelector('#name-error-2')
var errorGuess1 = document.querySelector('#guess-error-1')
var errorGuess2 = document.querySelector('#guess-error-2')
var errorInputMin = document.querySelector('#range-error-min')
var errorInputMax = document.querySelector('#range-error-max')
/*---------- Global Variables ----------*/
var outputWinner;
let minNumber = parseInt(inputRangeMin.value) || 1;
let maxNumber = parseInt(inputRangeMax.value) || 100;
let timer = 0;
let timerMin = 0;
var guessCounter = 1;
var highScoreCount;

/*---------- Event Listeners -----------*/
btnUpdateRange.addEventListener('click', updateRange);
btnSubmit.addEventListener('click', playGame);
// btnHideCard.addEventListener('click', deleteCard);
// btnReset.addEventListener('keydown' toggleReset)
// btnReset.addEventListener('click', resetGame); 
btnClear.addEventListener('click', resetChallengerForm);
// btnClear.addEventListener('keydown', toggleClear);
inputRangeMin.addEventListener('focusout', checkRangeMin)

inputNameCh1.addEventListener('input', validateCh1Name);
inputGuessCh1.addEventListener('input', validateCh1Guess);
inputNameCh2.addEventListener('input', validateCh2Name);
inputGuessCh2.addEventListener('input', validateCh2Guess);

inputGuessCh1.addEventListener('keydown', validateRange);
inputGuessCh2.addEventListener('keydown', validateRange);
inputRangeMax.addEventListener('keydown', validateRange);
inputRangeMin.addEventListener('keydown', validateRange);
inputNameCh1.addEventListener('keydown', validateForAlphaNumeric);
// inputNameCh1.addEventListener('input', validateCh1Name);
inputNameCh2.addEventListener('keydown', validateForAlphaNumeric);
asideColumn.addEventListener('click', deleteCard);



/*---------- Functions -----------------*/

function makeRandomNumber() {
  if(minNumber<=0){
    minNumber = 1;
  }
  randomNum = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
  console.log(randomNum)
}

function validateRange(e){
  var regex = /[\d\t\n\r]/g;
  if (e.key === 'Backspace' || regex.test(e.key)){
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

function validateCh1Name(){
  if(inputNameCh1.value == ''){
    inputNameCh1.classList.add('error')
    errorName1.style.display = 'block';
  } else {
    inputNameCh1.classList.remove('error');
    errorName1.style.display=  'none';
  }
}

function validateCh2Name(){
  if(inputNameCh2.value == ''){
    inputNameCh2.classList.add('error')
    errorName2.style.display = 'block';
  } else {
    inputNameCh2.classList.remove('error');
    errorName2.style.display = 'none';
  }
}

function validateCh1Guess(){
  if(inputGuessCh1.value == '' || inputGuessCh1.value == /[\d]/){
    inputGuessCh1.classList.add('error');
    errorGuess1.style.display= 'block';
  } else {
    inputGuessCh1.classList.remove('error');
    errorGuess1.style.display = 'none';
  } 
}

function validateCh2Guess(){
  if(inputGuessCh2.value == ''){
    inputGuessCh2.classList.add('error')
    errorGuess2.style.display = 'block';
  } else {
    inputGuessCh2.classList.remove('error')
    errorGuess2.style.display = 'none'
  }
}

function checkRangeMin(e){
  if(inputRangeMin.value > outputRangeMax.value){
    inputRangeMin.classList.add('error')
    errorInputMin.style.display = 'block';
    btnUpdateRange.setAttribute('disabled','true');
  } else {
    inputRangeMin.classList.remove('error')
    errorInputMin.style.display = 'none';
    btnUpdateRange.removeAttribute('disabled')
  }
}


function validateAllInputs(){
  validateCh1Guess()
  validateCh2Guess()
  validateCh1Name()
  validateCh2Name()
}

function validateRange(e){
  if(minNumber >= maxNumber){
    inputRangeMin.classList.add('error')
    errorInputMin.style.display = 'block';
  } else if (maxNumber <= minNumber) {
    inputRangeMax.classList.add('error')
    errorInputMax.style.display = 'none';
  }
}


function updateRange(e) {
  e.preventDefault();
  minNumber = parseInt(inputRangeMin.value) || 1;
  maxNumber = parseInt(inputRangeMax.value) || 100;
  validateRange()
  makeRandomNumber();
  changeDOMRange();
  formUpdateRange.reset();
}

function changeDOMRange(){
  outputRangeMin.innerText = minNumber;
  outputRangeMax.innerText = maxNumber;
}

function checkGuess(inputGuess) {
  let outputHighLow = outputHighLow1;
  let inputName = inputNameCh1;
  if(inputGuess.id === inputGuessCh2.id){
    outputHighLow = outputHighLow2;
    inputName = inputNameCh2;
  } 
  if(inputGuess.value == randomNum) { 
    winner(outputHighLow, inputName)
  } else if (inputGuess.value < randomNum) {
    tooLow(outputHighLow)
  } else { 
    tooHigh(outputHighLow);
  }
}

class Guess {
  constructor(name, guess){
    this.name = name;
    this.guess = guess;
  }
}

function tooLow(outputHighLow){
  outputHighLow.innerText = 'that\'s too low';
  guessCounter++;
}

function tooHigh(outputHighLow){
    outputHighLow.innerText = 'that\'s too high';
    guessCounter ++;
}

function winner(outputHighLow, inputName){
  outputWinner = inputName.value;
  outputHighLow.innerText = 'BOOM';
  increaseDifficulty()
  appendCard();
  guessCounter = 0;
}

function resetChallengerForm(e){
  e.preventDefault();
  formChallenger.reset();
};

function playGame(e) {
  e.preventDefault();
  if(inputNameCh1.innerText && inputGuessCh1.innerText && inputNameCh2.innerText && inputGuessCh2.innerText == ''){
    alert('you need to enter Somethin!')
  } else {
    displayNames();
    checkGuess(inputGuessCh1);
    checkGuess(inputGuessCh2);
    validateAllInputs();
  }
}; 


function displayNames(){
  outputNameCh1.innerText = inputNameCh1.value || 'Challenger 1 Name';
  outputGuessCh1.innerText = inputGuessCh1.value || '--';
  outputNameCh2.innerText = inputNameCh2.value || 'Challenger 2 Name';
  outputGuessCh2.innerText = inputGuessCh2.value || '--';
}

// function validateInput(input) {
//   if(inputAll = ''){
//     inputAll.classList.add('error');
//     return
//   }else{
//     inputAll.classList.remove('error');
//   }
// }

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