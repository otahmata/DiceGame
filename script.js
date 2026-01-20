"use strict";

//Dice image elements
const box1Element = document.querySelector("#box1 img");
const box2Element = document.querySelector("#box2 img");
const box3Element = document.querySelector("#box3 img");
const box4Element = document.querySelector("#box4 img");
const box5Element = document.querySelector("#box5 img");
const box6Element = document.querySelector("#box6 img");

//Box-button elements
const button1Element = document.getElementById("box1");
const button2Element = document.getElementById("box2");
const button3Element = document.getElementById("box3");
const button4Element = document.getElementById("box4");
const button5Element = document.getElementById("box5");
const button6Element = document.getElementById("box6");

//Other button elements
const rollButton = document.querySelector(".btn--roll");
const rerollUnselectedButton = document.querySelector(
  ".btn--reroll--unselected",
);
const rerollAllButton = document.querySelector(".btn--reroll--all");
const lockInButton = document.querySelector(".btn--lock--in");
const returnHomeButton = document.querySelector(".btn--losing");

//Score elements
const handScoreValue = document.getElementById("hand-score-value");
const scoreValue = document.getElementById("score-value");

//Function calculating how many of each dice is in an array
const rollSummary = function (dice) {
  let numbers = [0, 0, 0, 0, 0, 0];
  for (let i = 0; i <= dice.length - 1; i++) {
    if (dice[i] !== 0) {
      numbers[dice[i] - 1]++;
    }
  }
  return numbers;
};

const newCountDiceScores = function (dice, triples) {
  let score = 0;
  let summary = rollSummary(dice);
  for (let i = 0; i <= 5; i++) {
    if (triples[i] == 1) {
      if (summary[i] >= 1) {
        if (i == 0) {
          score += 1000 * summary[i];
        } else {
          score += 100 * (i + 1) * summary[i];
        }
      } else {
        triples[i] = 0;
      }
    } else {
      if (i == 0) {
        if (summary[i] < 3) {
          score += 100 * summary[i];
        } else {
          score += 1000 + 1000 * (summary[i] - 3);
          triples[i] = 1;
        }
      } else if (i == 4) {
        if (summary[i] < 3) {
          score += 50 * summary[i];
        } else {
          score += 500 + 500 * (summary[i] - 3);
          triples[i] = 1;
        }
      } else {
        if (summary[i] >= 3) {
          score += 100 * (i + 1) * (summary[i] - 2);
          triples[i] = 1;
        }
      }
    }
  }
  return score;
};

//Function to roll 6 dice and display them
const rollAllDice = function () {
  let rolls = [0, 0, 0, 0, 0, 0];
  for (let i = 0; i <= 5; i++) {
    rolls[i] = Math.ceil(Math.random() * 6);
    document.querySelector(`#box${i + 1} img`).src = `dice-${rolls[i]}.png`;
  }
  return rolls;
};

//Function to check if two arrays are identical
const arraysEqual = function (arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
};

//Function to reset the dice and their boxes
const resetBoxes = function () {
  button1Element.classList.remove("lockedin--dice");
  button2Element.classList.remove("lockedin--dice");
  button3Element.classList.remove("lockedin--dice");
  button4Element.classList.remove("lockedin--dice");
  button5Element.classList.remove("lockedin--dice");
  button6Element.classList.remove("lockedin--dice");

  button1Element.classList.remove("selected--dice");
  button2Element.classList.remove("selected--dice");
  button3Element.classList.remove("selected--dice");
  button4Element.classList.remove("selected--dice");
  button5Element.classList.remove("selected--dice");
  button6Element.classList.remove("selected--dice");
};

const initialise = function () {
  resetBoxes();
  box1Element.src = "question-mark.png";
  box2Element.src = "question-mark.png";
  box3Element.src = "question-mark.png";
  box4Element.src = "question-mark.png";
  box5Element.src = "question-mark.png";
  box6Element.src = "question-mark.png";
  gameStarted = false;
  rollButton.classList.remove("hidden");
  rerollUnselectedButton.classList.add("hidden");
  rerollAllButton.classList.add("hidden");
  lockInButton.classList.add("hidden");
  returnHomeButton.classList.add("hidden");
  handScoreValue.textContent = 0;
  ifReroll = [0, 0, 0, 0, 0, 0];
  lockedIn = [0, 0, 0, 0, 0, 0];
  score1 = 0;
};

const showButtons = function () {
  rollButton.classList.add("hidden");
  rerollUnselectedButton.classList.remove("hidden");
  rerollAllButton.classList.remove("hidden");
  lockInButton.classList.remove("hidden");
};

const showLosingButtons = function () {
  rollButton.classList.add("hidden");
  rerollUnselectedButton.classList.add("hidden");
  rerollAllButton.classList.add("hidden");
  lockInButton.classList.add("hidden");
  returnHomeButton.classList.remove("hidden");
};

const gameLostCheck = function (diceToCheck) {
  let tempTriples = [...aliveTriples];
  if (newCountDiceScores(diceToCheck, aliveTriples) == 0) {
    gameStarted = false;
    showLosingButtons();
  }
  aliveTriples = tempTriples;
};

let rolled;
let ifReroll = [0, 0, 0, 0, 0, 0];
let gameStarted = false;
let countableDice = [0, 0, 0, 0, 0, 0];
let aliveTriples = [0, 0, 0, 0, 0, 0];
let score1 = 0;
let score2 = 0;
let score3 = 0;
let first6;
let newlyRolledDice = [];
let lockedIn = [0, 0, 0, 0, 0, 0];
initialise();

//Start game button functionality
rollButton.addEventListener("click", function () {
  if (gameStarted == false) {
    gameStarted = true;
    rolled = rollAllDice();

    gameLostCheck(rolled);
  }
});

//Dice box-buttons functionality
button1Element.addEventListener("click", function () {
  if (gameStarted && lockedIn[0] == 0) {
    button1Element.classList.toggle("selected--dice");
    ifReroll[0] = 1 - ifReroll[0];
    showButtons();
    countableDice[0] = rolled[0] - countableDice[0];
    // console.log("didnt work");
  }
});

button2Element.addEventListener("click", function () {
  if (gameStarted && lockedIn[1] == 0) {
    button2Element.classList.toggle("selected--dice");
    ifReroll[1] = 1 - ifReroll[1];
    showButtons();
    countableDice[1] = rolled[1] - countableDice[1];
  }
});

button3Element.addEventListener("click", function () {
  if (gameStarted && lockedIn[2] == 0) {
    button3Element.classList.toggle("selected--dice");
    ifReroll[2] = 1 - ifReroll[2];
    showButtons();
    countableDice[2] = rolled[2] - countableDice[2];
  }
});

button4Element.addEventListener("click", function () {
  if (gameStarted && lockedIn[3] == 0) {
    button4Element.classList.toggle("selected--dice");
    ifReroll[3] = 1 - ifReroll[3];
    showButtons();
    countableDice[3] = rolled[3] - countableDice[3];
  }
});

button5Element.addEventListener("click", function () {
  if (gameStarted && lockedIn[4] == 0) {
    button5Element.classList.toggle("selected--dice");
    ifReroll[4] = 1 - ifReroll[4];
    showButtons();
    countableDice[4] = rolled[4] - countableDice[4];
  }
});

button6Element.addEventListener("click", function () {
  if (gameStarted && lockedIn[5] == 0) {
    button6Element.classList.toggle("selected--dice");
    ifReroll[5] = 1 - ifReroll[5];
    showButtons();
    countableDice[5] = rolled[5] - countableDice[5];
  }
});

//Reroll unselected dice button functionality
rerollUnselectedButton.addEventListener("click", function () {
  if (gameStarted == false) {
    initialise();
  } else {
    let temp = 0;
    for (let i = 0; i <= 5; i++) {
      if (ifReroll[i] == 1) {
        document.getElementById(`box${i + 1}`).classList.add("lockedin--dice");
        lockedIn[i] = ifReroll[i];
      } else {
        temp = Math.ceil(Math.random() * 6);
        newlyRolledDice.push(temp);
        rolled[i] = temp;
        document.querySelector(`#box${i + 1} img`).src = `dice-${temp}.png`;
      }
    }
  }
  console.log(lockedIn);

  score1 += newCountDiceScores(countableDice, aliveTriples);
  countableDice = [0, 0, 0, 0, 0, 0];

  handScoreValue.textContent = score1;

  gameLostCheck(newlyRolledDice);
  newlyRolledDice = [];
});

//Reroll all (selected) dice button functionality
rerollAllButton.addEventListener("click", function () {
  if (arraysEqual(ifReroll, [1, 1, 1, 1, 1, 1])) {
    resetBoxes();
    rolled = rollAllDice();
    ifReroll = [0, 0, 0, 0, 0, 0];
    score1 += newCountDiceScores(countableDice, aliveTriples);
    countableDice = [0, 0, 0, 0, 0, 0];
  }
  handScoreValue.textContent = score1;
});

//Lock in points button functionality
lockInButton.addEventListener("click", function () {
  score1 += newCountDiceScores(countableDice, aliveTriples);
  countableDice = [0, 0, 0, 0, 0, 0];
  score2 += score1;
  scoreValue.textContent = score2;
  initialise();
});

//Return to home button functionality
returnHomeButton.addEventListener("click", function () {
  initialise();
});
