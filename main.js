/*---------- Query Selectors -----------*/
/*---------- Input Var.      -----------*/
var inputRangeMin = document.querySelector('#input-minrange');
var inputRangeMax = document.querySelector('#input-maxrange');
var inputNameCh1 = document.querySelector('#input-name-challenger1');
var inputNameCh2 = document.querySelector('#input-name-challenger2');
var inputGuessCh1 = document.querySelector('#input-guess-challenger1');
var inputGuessCh2 = document.querySelector('#input-guess-challenger2');
/*--------- Output Var -----------------*/
var outputRangeMin= document.querySelector('#range-min');
var outputRangeMax= document.querySelector('#range-max');
var outputNameCh1 = document.querySelector('#name-output-challenger1');
var outputNameCh2 = document.querySelector('#name-output-challenger2');
var outputGuessCh1 = document.querySelector('#guess-output-challenger1');
var outputGuessCh2 = document.querySelector('#guess-output-challenger2');
/*--------- Buttons --------------------*/
var btnUpdateRange = document.querySelector('#btn-update');
var btnSubmit = document.querySelector('#btn-submit');
var btnReset = document.querySelector('#btn-reset');
var btnClear = document.querySelector('#btn-clear');

/*---------- Global Variables ----------*/


/*---------- Event Listeners -----------*/
btnUpdateRange.addEventListener('click', updateRange);
btnSubmit.addEventListener('click', playGame);


/*---------- Functions -----------------*/
function updateRange(e){
  e.preventDefault();
  outputRangeMin.innerText = inputRangeMin.value;
  outputRangeMax.innerText = inputRangeMax.value;
}

function playGame(e){
  e.preventDefault();
  checkValidInputCh1();
  checkValidInputCh2();
  checkValidInputGuess1();
  checkValidInputGuess2();
  outputNameCh1.innerText = inputNameCh1.value;
  outputGuessCh1.innerText = inputGuessCh1.value;
  outputNameCh2.innerText = inputNameCh2.value;
  outputGuessCh2.innerText = inputGuessCh2.value;
} 
// if name or guess is empty string apply error classfrom css and end function 
function checkValidInputCh1(){
  if (inputNameCh1.value === '') {
    inputNameCh1.classList.add('error');
  } else {
    inputNameCh1.classList.remove('error');
  }  
}

function checkValidInputCh2(){
  if (inputNameCh2.value === '') {
    inputNameCh2.classList.add('error');
  } else {
    inputNameCh2.classList.remove('error');
  }
}

function checkValidInputGuess1(){
  if (inputGuessCh1.value === '') {
    inputGuessCh1.classList.add('error');
  } else {
    inputGuessCh1.classList.remove('error');
  }  
}


function checkValidInputGuess2(){
  if (inputGuessCh2.value === '') {
    inputGuessCh2.classList.add('error');
  } else {
    inputGuessCh2.classList.remove('error');
  }  
}
