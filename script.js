'use strict';
//selecting Elements
const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');
const score0EL = document.getElementById('score--0');
const score1EL = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEL = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//starting conditions
score0EL.textContent = 0;
score1EL.textContent = 0;
diceEL.classList.add('hidden');

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0EL.classList.toggle('player--active');
  player1EL.classList.toggle('player--active');
};

//Dice roll btn fuction
btnRoll.addEventListener('click', function () {
  //checking game state
  if (playing) {
    // 1. generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. display dice
    diceEL.classList.remove('hidden');
    diceEL.src = `dice-${dice}.png`;

    // 3. Check for rolled 1: if true, switch players
    if (dice !== 1) {
      // add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch players
      switchPlayer();
    }
  }
});

//Hold Btn Fuction
btnHold.addEventListener('click', function () {
  //checking game state
  if (playing) {
    //1. Adding current score to total score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2. Check if score is >= 100
    //If the score is >= 100 finish game
    if (scores[activePlayer] >= 10) {
      //finish the game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEL.classList.add('hidden');
    } else {
      //3 If score is not >= 100 switch players
      switchPlayer();
    }
  }
});

// New game btn Fuction
btnNew.addEventListener('click', function () {
  //Reset game state
  playing = true;

  // removing CSS classes and resetting html values
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  document.getElementById(`current--0`).textContent = 0;
  document.getElementById(`current--1`).textContent = 0;
  document.getElementById(`score--0`).textContent = 0;
  document.getElementById(`score--1`).textContent = 0;
  diceEL.classList.add('hidden');
  player0EL.classList.add('player--active');
  player1EL.classList.remove('player--active');

  //resetting JS values
  scores[0] = 0;
  scores[1] = 0;
  currentScore = 0;
  console.table(scores);
  console.log(currentScore);
  activePlayer = 0;
});
