const X_CLASS = "x";
const CIRCLE_CLASS = "circle";
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [3, 4, 5],
  [6, 7, 8],
  [2, 5, 8],
  [2, 4, 6]
];
const cellElements = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const winningMessageElement = document.getElementById("winningMessage");
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector(
  "[data-winning-message-text]"
);
let circleTurn;

startGame();

// restart game
restartButton.addEventListener('click', startGame);

// start game
function startGame() {
  circleTurn = false;
  cellElements.forEach(cell => {
      // remove class for reset the game
    cell.classList.remove(X_CLASS)
    cell.classList.remove(CIRCLE_CLASS)

    //remove event listner for reset
    cell.removeEventListener('click', handleClick)
    
    cell.addEventListener("click", handleClick, { once: true });
  });
  setBoardHoverClass();
  winningMessageElement.classList.remove('show')
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  placeMark(cell, currentClass);
  //check for win
  if (checkWin(currentClass)) {
    endGame(false)
  } else if (isDraw()) {    //check for draw
      endGame(true)
  } else {
    swapTurns();         // switch turn
    setBoardHoverClass();
  }  
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = 'Draw!'
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`;
  }
  winningMessageElement.classList.add('show')
}

//Draw class

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) ||
        cell.classList.contains(CIRCLE_CLASS)
    })
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurns() {
  circleTurn = !circleTurn;
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}
