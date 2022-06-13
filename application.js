$(document).ready(function () {
// Global Variables
var currentEquation;
var interval;
var numberLimit = document.querySelector('#numberSelector');
var timeRemaining = 10;
var currentScore = 0;
var finalScore = 0;
var highScore = 0;


// choosing max number for equation
var select = '';
for (i = 10; i <= 100; i++) {
  select += '<option val=' + i + '>' + i + '</option>';
}
$('#numberSelector').html(select);


// generate random numbers
var randomNumber = function (size) {
  return Math.ceil(Math.random() * size);
}



// generate equation
var callEquation = function () {
  console.log(numberLimit.selectedIndex);

  var equation = [];

  var numberOne = randomNumber(numberLimit.selectedIndex + 10);
  var numberTwo = randomNumber(numberLimit.selectedIndex + 10);

  equation.answer = numberOne + numberTwo;
  equation.display = String(numberOne) + ' + ' + String(numberTwo);

  return equation;
};


// generate NEW equation
var callNewEquation = function () {
  currentEquation = callEquation();
  $('#equation').html(currentEquation.display);
}



// check answer
var checkAnswer = function (userInput, answer) {
  if (userInput === answer) {
    callNewEquation();
    $('#answer').val('');
    updateTimeRemaining(+1);
    updateCurrentScore(+1);
  }
};



// start  game
var startGame = function () {
  if (!interval) {
    if (timeRemaining === 0) {
      updateTimeRemaining(10);
      updateCurrentScore(-currentScore);
      updateHighScore();
    };
    interval = setInterval (function () {
      updateTimeRemaining(-1);
      if (timeRemaining === 0) {
        clearInterval(interval);
        interval = undefined;
      };
    }, 1000);
  };
};



// start game with user input   
$('#answer').on('keyup', function () {
  startGame();
  checkAnswer(Number($(this).val()), currentEquation.answer);
});



// update time remaining
var updateTimeRemaining = function (amount) {
  timeRemaining += amount;
  $('#timeRemaining').html(timeRemaining);
};



// update current score
var updateCurrentScore = function (amount) {
  finalScore = currentScore;
  currentScore += amount;
  $('#currentScore').html(currentScore);
};



// update high score
var updateHighScore = function () {
  if (finalScore > highScore) {
    highScore = finalScore;
    $('#highScore').html(highScore);
  } else {
    $('#highScore').html(highScore);
  };
};



// call new equation, again
callNewEquation();

});



