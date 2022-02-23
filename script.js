//when page loads hide the restart button
window.onload = () => {
  restartButton.style.visibility = "hidden";
};
//get the elements from the HTML
let dataCells = document.querySelectorAll(".cell");
let winningMessage = document.getElementById("winningMessage");
let restartButton = document.getElementById("restartButton");
let board = document.getElementById("board");

//value to check which turn it is
let firstTurn = true;
//values so later can be added to classes on the data cells
let o = "o";
let x = "x";
//array of winning combos
let winningCombo = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

//function to reload the page
let refreshPage = () => {
  window.location.reload();
};

//function to handle the click on the cells
let handleClick = (e) => {
  //target the cell that's been clicked
  let cell = e.target;
  let currentTurn = getRole();
  placeMarker(cell, currentTurn);
  if (checkWinner(currentTurn)) {
    endGame(false);
  } else if (gameDraw()) {
    endGame(true);
  }
};

//add the class list to the current cell that's been clicked
let placeMarker = (cell, currentTurn) => {
  cell.classList.add(currentTurn);
};

//for each data cell add a even listener, that can only be clicked once
dataCells.forEach((cell) => {
  cell.addEventListener("click", handleClick, { once: true });
});

let endGame = (draw) => {
  if (draw) {
    board.style.visibility = "hidden";
    winningMessage.innerHTML = "Draw!";
    restartButton.style.visibility = "visible";
    //button to refresh the page and restart the game
    restartButton.addEventListener("click", refreshPage);
  } else {
    board.style.visibility = "hidden";
    if (firstTurn) {
      winningMessage.innerHTML = "O won";
    } else {
      winningMessage.innerHTML = "X won";
    }
    restartButton.style.visibility = "visible";
    //button to refresh the page and restart the game
    restartButton.addEventListener("click", refreshPage);
  }
};

//if the game is a draw
let gameDraw = () => {
  //checking to see if all the data cells are filled with either x's or o's, and return true because it is a draw
  return [...dataCells].every((cell) => {
    return cell.classList.contains(x) || cell.classList.contains(o);
  });
};

//function to get the next role
let getRole = () => {
  if (firstTurn) {
    firstTurn = false;
    return x;
  } else {
    firstTurn = true;
    return o;
  }
};

//function to check the winner
let checkWinner = (currentTurn) => {
  //return true if one of the combos from the winning array is executed
  return winningCombo.some((combo) => {
    //return the index of every data cell that's been clicked
    return combo.every((index) => {
      //check to see if the class list is the same of the winning combo
      return dataCells[index].classList.contains(currentTurn);
    });
  });
};
