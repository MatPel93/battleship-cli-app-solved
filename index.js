const readlineSync = require("readline-sync");

//message to display at a win
const winMessage = `========
    __   _______ _   _   _    _ _____ _   _
    \ \ / /  _  | | | | | |  | |_   _| \ | |
     \ V /| | | | | | | | |  | | | | |  \| |
      \ / | | | | | | | | |/\| | | | | . ' |
      | | \ \_/ / |_| | \  /\  /_| |_| |\  |
      \_/  \___/ \___/   \/  \/ \___/\_| \_/
========`;

// Greet the user and as which size boad would they like to use.

function welcome() {
  console.log("Hello! Welcome to my Battleship game!");
}

let userBoardSize;

function chooseBoardSize() {
  const answers = ["4x4", "5x5", "6x6"];
  boardSize = readlineSync.keyInSelect(answers, "Please choose a board size!");
  userBoardSize = answers[boardSize];
  if (boardSize < 3 && boardSize > 0) {
    console.log("Building a " + answers[boardSize] + " game!");
  } else {
    console.log("Cancelling game!");
  }
}

//create a board template to be filled in once i have random placements for ships.
function generateBoard(size) {
  const board = [];
  for (let row = 0; row < size; row++) {
    const rowArray = [];
    for (let col = 0; col < size; col++) {
      rowArray.push({ type: "empty", hit: false });
    }
    board.push(rowArray);
  }
  return board;
}

//generate locations for first large ship based on any size board since they all contain one large and one small
//function to call when i need to place a large or small ship cell
function placeShipCell(id) {
  {
    return { type: id === 1 ? "large" : "small", id, hit: false };
  }
}
//to check if the ship cell i am placing is within the bounds of the board and does not come in contact with another ship
function isValid(table, row, col) {
  return (
    row >= 0 &&
    row < table.length &&
    col >= 0 &&
    col < table.length &&
    table[row][col].type === "empty"
  );
}

//genderate a random number index
const randomIndex = (arr) => {
  return Math.floor(Math.random() * arr.length);
};

//place 3 large ship cells
function placeLargeShip(table) {
  const directions = [
    [0, -1],
    [0, 1],
    [-1, 0],
    [1, 0],
  ];

  let place = false;

  //while the random locations fall on either out of bounds areas or other ships find other locations until the spots are empty
  while (!place) {
    const row = randomIndex(table);
    const col = randomIndex(table[0]);

    const dir = directions[randomIndex(directions)];

    const secondRow = row + dir[0];
    const secondCol = col + dir[1];
    const thirdRow = row + dir[0] * 2;
    const thirdCol = col + dir[1] * 2;

    if (
      isValid(table, row, col) &&
      isValid(table, secondRow, secondCol) &&
      isValid(table, thirdRow, thirdCol)
    ) {
      table[row][col] = placeShipCell(1);
      table[secondRow][secondCol] = placeShipCell(1);
      table[thirdRow][thirdCol] = placeShipCell(1);
      place = true;
    }
  }
}

//same again for a small ship not
function placeSmallShip(table) {
  const directions = [
    [0, -1],
    [0, 1],
    [-1, 0],
    [1, 0],
  ];

  let place = false;

  while (!place) {
    const row = randomIndex(table);
    const col = randomIndex(table[0]);

    const dir = directions[randomIndex(directions)];

    const secondRow = row + dir[0];
    const secondCol = col + dir[1];

    if (isValid(table, row, col) && isValid(table, secondRow, secondCol)) {
      table[row][col] = placeShipCell(2);
      table[secondRow][secondCol] = placeShipCell(2);
      place = true;
    }
  }
}
//show the board as the game is being played
function displayBoard(board) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const header = ["  ", ...board[0].map((_, i) => i)].join("  ");
  console.log(header);

  for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
    const rowLabel = alphabet[rowIndex];
    const row = board[rowIndex]
      .map((cell) => {
        if (!cell.hit) return "-"; // not guessed yet
        if (cell.type === "empty") return "❗"; // miss
        if (cell.type === "small") return "🟠"; // small ship
        if (cell.type === "large") return "🔵"; // large ship
      })
      .join("  ");
    console.log(`${rowLabel} ${row}`);
  }
}

//take the users guess and assign it to a coordinate
function parseGuess(guess, boardSize) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  guess = guess.toUpperCase().trim();

  if (guess.length !== 2) {
    console.clear();
    return null;
  }

  const rowLetter = guess[0];
  const colNumber = guess.slice(1);

  const row = alphabet.indexOf(rowLetter);
  const col = parseInt(colNumber, 10);

  if (row === -1 || isNaN(col) || row >= boardSize || col >= boardSize) {
    console.log("Invalid input, outside of board size");
    return null;
  }

  return { row, col };
}

//count the amount of ships in the game to figure how long the game will be played
function countShipPieces(board) {
  let count = 0;
  for (let row of board) {
    for (let index of row) {
      if (index.type !== "empty") count++;
    }
  }
  return count;
}

//now that the board has been built we need a way to allow users to guess cells and display the hit if it is an empty square display'❗', if a small ship '🟠' and a large '🔵'
function guess(board) {
  const totalShipCells = countShipPieces(board);
  let hits = 0;

  while (hits < totalShipCells) {
    console.clear();
    displayBoard(board);

    let coordinates;

    //loop for prompting until valid input
    while (!coordinates) {
      const input = readlineSync
        .question("Please choose a coordinate i.e. (B4...): ")
        .toUpperCase();

      coordinates = parseGuess(input, board.length);

      if (!coordinates) {
        console.log("Invalid input. Try again.");
        readlineSync.question("Press Enter to continue...");
        console.clear();
        displayBoard(board);
      }
    }

    const { row, col } = coordinates;

    // Validate bounds
    if (row < 0 || row >= board.length || col < 0 || col >= board.length) {
      console.log("That guess is out of bounds.");
      readlineSync.question("Press Enter to continue...");
      continue; // Go to next round
    }

    const cell = board[row][col];

    if (cell.hit) {
      console.log("You've already guessed that spot.");
      readlineSync.question("Press Enter to continue...");
      continue;
    }

    // Mark the hit and update game state
    cell.hit = true;

    if (cell.type !== "empty") {
      hits++;
      console.log("Hit!");
    } else {
      console.log("Miss!");
    }

    readlineSync.question("Press Enter to continue...");
  }

  console.clear();
  displayBoard(board);
  console.log(winMessage);
}

//run the game
welcome();
chooseBoardSize();

if (userBoardSize == "4x4") {
  const size4Board = generateBoard(4);
  placeLargeShip(size4Board);
  placeSmallShip(size4Board);
  guess(size4Board);
} else if (userBoardSize == "5x5") {
  const size5Board = generateBoard(5);
  placeLargeShip(size5Board);
  placeSmallShip(size5Board);
  placeSmallShip(size5Board);
  guess(size5Board);
} else if (userBoardSize == "6x6") {
  const size6Board = generateBoard(6);
  placeLargeShip(size6Board);
  placeLargeShip(size6Board);
  placeSmallShip(size6Board);
  placeSmallShip(size6Board);
  guess(size6Board);
}
