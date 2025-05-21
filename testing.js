const readlineSync = require("readline-sync");

// Greet the user and as which size boad would they like to use.

function welcome() {
  console.log("Hello! Welcome to my Battleship game!");
}

let boardSizeSelection;

function chooseBoardSize() {
  const answers = ["4x4", "5x5", "6x6"];
  boardSize = readlineSync.keyInSelect(answers, "Please choose a board size!");
  boardSizeSelection = answers[boardSize];
  if (boardSize < 3) {
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

//showcase to see what is hit and what is not on the board for debugging
function boardDisplayHitOrMiss(table, debug) {
  if (debug == true) {
    for (let i = 0; i < table.length; i++) {
      for (let j = 0; j < table[i].length; j++) {
        table[i][j].hit = true;
      }
    }
  }
  const playBoardTable = [];
  for (let i = 0; i < table.length; i++) {
    const rowArray = table[i];
    const result = [];
    for (let j = 0; j < rowArray.length; j++) {
      if (rowArray[j].hit && rowArray[j].type == "small") {
        result.push("🟠");
      } else if (rowArray[j].hit && rowArray[j].type == "large") {
        result.push("🔵");
      } else if (rowArray[j].hit && rowArray[j].type == "empty") {
        result.push("❗");
      } else result.push("-");
    }
    playBoardTable.push(result);
  }
  return playBoardTable;
}

const randomIndex = (arr) => {
  return Math.floor(Math.random() * arr.length);
};

//function for added the second small ship to be called for 5x5 and 6x6
function addSecondSmallShip(table) {
  let randomRowIndex3;
  let selectedRow3;
  let randomIndexSmall2;
  do {
    randomRowIndex3 = randomIndex(table);
    selectedRow3 = table[randomRowIndex3];
    randomIndexSmall2 = randomIndex(selectedRow3);
  } while (
    selectedRow3[randomIndexSmall2].type == "large" ||
    selectedRow3[randomIndexSmall2].type == "small"
  );
  selectedRow3[randomIndexSmall2] = { type: "small", id: 2, hit: false };
  const smallShip2Direction = [0, 1];
  let selectedSmallShip2Direction = randomIndex(smallShip2Direction);
  //check if second location for small ship is not undefined or the big ship for either lateral direction or horizontal if chose and also not part of the large ship
  do {
    if (
      selectedSmallShip2Direction == 0 &&
      selectedRow3[randomIndexSmall2 - 1] !== undefined &&
      selectedRow3[randomIndexSmall2 - 1].type !== "large" &&
      selectedRow3[randomIndexSmall2 - 1].type !== "small"
    ) {
      selectedRow3[randomIndexSmall2 - 1] = {
        type: "small",
        id: 2,
        hit: false,
      };
      selectedSmallShip2Direction = 2;
    } else if (
      selectedSmallShip2Direction == 0 &&
      selectedRow3[randomIndexSmall2 + 1] !== undefined &&
      selectedRow3[randomIndexSmall2 + 1].type !== "large" &&
      selectedRow3[randomIndexSmall2 + 1].type !== "small"
    ) {
      selectedRow3[randomIndexSmall2 + 1] = {
        type: "small",
        id: 2,
        hit: false,
      };
      selectedSmallShip2Direction = 2;
    } else if (selectedSmallShip2Direction == 0) {
      selectedSmallShip2Direction = 1;
    }
    if (
      selectedSmallShip2Direction == 1 &&
      table[randomRowIndex3 - 1] !== undefined &&
      table[randomRowIndex3 - 1][randomIndexSmall2].type !== "large" &&
      table[randomRowIndex3 - 1][randomIndexSmall2].type !== "small"
    ) {
      table[randomRowIndex3 - 1][randomIndexSmall2] = {
        type: "small",
        id: 2,
        hit: false,
      };
      selectedSmallShip2Direction = 2;
    } else if (
      selectedSmallShip2Direction == 1 &&
      table[randomRowIndex3 + 1] !== undefined &&
      table[randomRowIndex3 + 1][randomIndexSmall2].type !== "large" &&
      table[randomRowIndex3 + 1][randomIndexSmall2].type !== "small"
    ) {
      table[randomRowIndex3 + 1][randomIndexSmall2] = {
        type: "small",
        id: 2,
        hit: false,
      };
      selectedSmallShip2Direction = 2;
    } else if (selectedSmallShip2Direction == 1) {
      selectedSmallShip2Direction = 0;
    }
  } while (
    selectedSmallShip2Direction == 0 ||
    selectedSmallShip2Direction == 1
  );
}

function addSecondLargeShip(table) {
  let randomRowIndex4;
  let selectedRow4;
  let randomIndexLarge2;
  do {
    randomRowIndex4 = randomIndex(table);
    selectedRow4 = table[randomRowIndex4];
    randomIndexLarge2 = randomIndex(selectedRow4);
  } while (
    selectedRow4[randomIndexLarge2].type == "large" ||
    selectedRow4[randomIndexLarge2].type == "small"
  );
  selectedRow4[randomIndexLarge2] = { type: "large", id: 1, hit: false };
  const largeShip2Direction = [0, 1];
  let selectedLargeShip2Direction = randomIndex(largeShip2Direction);
  do {
    if (selectedLargeShip2Direction == 0) {
      if (
        selectedRow4[randomIndexLarge2 - 1] !== undefined &&
        selectedRow4[randomIndexLarge2 + 1] !== undefined &&
        selectedRow4[randomIndexLarge2 - 1].type !== "small" &&
        selectedRow4[randomIndexLarge2 - 1].type !== "large" &&
        selectedRow4[randomIndexLarge2 + 1].type !== "large" &&
        selectedRow4[randomIndexLarge2 + 1].type !== "small"
      ) {
        selectedRow4[randomIndexLarge2 - 1] = {
          type: "large",
          id: 1,
          hit: false,
        };
        selectedRow4[randomIndexLarge2 + 1] = {
          type: "large",
          id: 1,
          hit: false,
        };
        selectedLargeShip2Direction = 2;
      } else if (
        selectedRow4[randomIndexLarge2 - 1] !== undefined &&
        selectedRow4[randomIndexLarge2 - 2] !== undefined &&
        selectedRow4[randomIndexLarge2 - 1].type !== "small" &&
        selectedRow4[randomIndexLarge2 - 1].type !== "large" &&
        selectedRow4[randomIndexLarge2 - 2].type !== "large" &&
        selectedRow4[randomIndexLarge2 - 2].type !== "small"
      ) {
        selectedRow4[randomIndexLarge2 - 1] = {
          type: "large",
          id: 1,
          hit: false,
        };
        selectedRow4[randomIndexLarge2 - 2] = {
          type: "large",
          id: 1,
          hit: false,
        };
        selectedLargeShip2Direction = 2;
      } else if (
        selectedRow4[randomIndexLarge2 + 1] !== undefined &&
        selectedRow4[randomIndexLarge2 + 2] !== undefined &&
        selectedRow4[randomIndexLarge2 + 1].type !== "small" &&
        selectedRow4[randomIndexLarge2 + 1].type !== "large" &&
        selectedRow4[randomIndexLarge2 + 2].type !== "large" &&
        selectedRow4[randomIndexLarge2 + 2].type !== "small"
      ) {
        selectedRow4[randomIndexLarge2 + 1] = {
          type: "large",
          id: 1,
          hit: false,
        };
        selectedRow4[randomIndexLarge2 + 2] = {
          type: "large",
          id: 1,
          hit: false,
        };
        selectedLargeShip2Direction = 2;
      } else {
        selectedLargeShip2Direction = 1;
      }
    }
    if (selectedLargeShip2Direction == 1) {
      if (
        table[selectedRow4 - 1] !== undefined &&
        table[selectedRow4 + 1] !== undefined &&
        table[selectedRow4 - 1][randomIndexLarge2].type !== "large" &&
        table[selectedRow4 - 1][randomIndexLarge2].type !== "small" &&
        table[selectedRow4 + 1][randomIndexLarge2].type !== "large" &&
        table[selectedRow4 + 1][randomIndexLarge2].type !== "small"
      ) {
        table[selectedRow4 - 1][randomIndexLarge2] = {
          type: "large",
          id: 1,
          hit: false,
        };
        table[selectedRow4 + 1][randomIndexLarge2] = {
          type: "large",
          id: 1,
          hit: false,
        };
        selectedLargeShip2Direction = 2;
      } else if (
        table[selectedRow4 - 1] !== undefined &&
        table[selectedRow4 - 2] !== undefined &&
        table[selectedRow4 - 1][randomIndexLarge2].type !== "large" &&
        table[selectedRow4 - 1][randomIndexLarge2].type !== "small" &&
        table[selectedRow4 - 2][randomIndexLarge2].type !== "large" &&
        table[selectedRow4 - 2][randomIndexLarge2].type !== "small"
      ) {
        table[selectedRow4 - 1][randomIndexLarge2] = {
          type: "large",
          id: 1,
          hit: false,
        };
        table[selectedRow4 - 2][randomIndexLarge2] = {
          type: "large",
          id: 1,
          hit: false,
        };
        selectedLargeShip2Direction = 2;
      } else if (
        table[selectedRow4 + 1] !== undefined &&
        table[selectedRow4 + 2] !== undefined &&
        table[selectedRow4 + 1][randomIndexLarge2].type !== "large" &&
        table[selectedRow4 + 1][randomIndexLarge2].type !== "small" &&
        table[selectedRow4 + 2][randomIndexLarge2].type !== "large" &&
        table[selectedRow4 + 2][randomIndexLarge2].type !== "small"
      ) {
        table[selectedRow4 + 1][randomIndexLarge2] = {
          type: "large",
          id: 1,
          hit: false,
        };
        table[selectedRow4 + 2][randomIndexLarge2] = {
          type: "large",
          id: 1,
          hit: false,
        };
        selectedLargeShip2Direction = 2;
      } else {
        selectedLargeShip2Direction = 0;
      }
    }
  } while (
    selectedLargeShip2Direction == 0 ||
    selectedLargeShip2Direction == 1
  );
}

//replace empty spots with random ship locations
const generateShips = (table) => {
  //select a random row to start for large ship
  const randomRowIndex1 = randomIndex(table);
  const selectedRow1 = table[randomRowIndex1];
  //select random index in the row for large ship
  const randomIndexLarge = randomIndex(selectedRow1);
  selectedRow1[randomIndexLarge] = { type: "large", id: 1, hit: false };
  //select additional spots for large ship direction first
  const largeShipDirection = [0, 1];
  const selectedLargeShipDirection = randomIndex(largeShipDirection);
  //select positions to the left and right if 0 and up and down if 1, if value selected are off the table (undefined) select 2 over in other direction
  if (selectedLargeShipDirection == 0) {
    selectedRow1[randomIndexLarge - 1] !== undefined
      ? (selectedRow1[randomIndexLarge - 1] = {
          type: "large",
          id: 1,
          hit: false,
        })
      : (selectedRow1[randomIndexLarge + 2] = {
          type: "large",
          id: 1,
          hit: false,
        });
    selectedRow1[randomIndexLarge + 1] !== undefined
      ? (selectedRow1[randomIndexLarge + 1] = {
          type: "large",
          id: 1,
          hit: false,
        })
      : (selectedRow1[randomIndexLarge - 2] = {
          type: "large",
          id: 1,
          hit: false,
        });
  }
  if (selectedLargeShipDirection == 1) {
    table[randomRowIndex1 - 1] !== undefined
      ? (table[randomRowIndex1 - 1][randomIndexLarge] = {
          type: "large",
          id: 1,
          hit: false,
        })
      : (table[randomRowIndex1 + 2][randomIndexLarge] = {
          type: "large",
          id: 1,
          hit: false,
        });
    table[randomRowIndex1 + 1] !== undefined
      ? (table[randomRowIndex1 + 1][randomIndexLarge] = {
          type: "large",
          id: 1,
          hit: false,
        })
      : (table[randomRowIndex1 - 2][randomIndexLarge] = {
          type: "large",
          id: 1,
          hit: false,
        });
  }
  //select second random location for selection of small ship
  let randomRowIndex2;
  let selectedRow2;
  let randomIndexSmall;
  // make sure both random selected locations are not the same
  do {
    randomRowIndex2 = randomIndex(table);
    selectedRow2 = table[randomRowIndex2];
    randomIndexSmall = randomIndex(selectedRow2);
  } while (
    selectedRow2[randomIndexSmall].type == "large" ||
    selectedRow2[randomIndexSmall].type == "small"
  );
  selectedRow2[randomIndexSmall] = { type: "small", id: 2, hit: false };
  const smallShipDirection = [0, 1];
  let selectedSmallShipDirection = randomIndex(smallShipDirection);

  //check if second location for small ship is not undefined or the big ship for either lateral direction or horizontal if chose and also not part of the large ship
  do {
    if (
      selectedSmallShipDirection == 0 &&
      selectedRow2[randomIndexSmall - 1] !== undefined &&
      selectedRow2[randomIndexSmall - 1].type !== "large"
    ) {
      selectedRow2[randomIndexSmall - 1] = { type: "small", id: 2, hit: false };
      selectedSmallShipDirection = 2;
    } else if (
      selectedSmallShipDirection == 0 &&
      selectedRow2[randomIndexSmall + 1] != undefined &&
      selectedRow2[randomIndexSmall + 1].type !== "large"
    ) {
      selectedRow2[randomIndexSmall + 1] = { type: "small", id: 2, hit: false };
      selectedSmallShipDirection = 2;
    } else if (selectedSmallShipDirection == 0) {
      selectedSmallShipDirection = 1;
    }
    if (
      selectedSmallShipDirection == 1 &&
      table[randomRowIndex2 - 1] !== undefined &&
      table[randomRowIndex2 - 1][randomIndexSmall].type !== "large"
    ) {
      table[randomRowIndex2 - 1][randomIndexSmall] = {
        type: "small",
        id: 2,
        hit: false,
      };
      selectedSmallShipDirection = 2;
    } else if (
      selectedSmallShipDirection == 1 &&
      table[randomRowIndex2 + 1] !== undefined &&
      table[randomRowIndex2 + 1][randomIndexSmall].type !== "large"
    ) {
      table[randomRowIndex2 + 1][randomIndexSmall] = {
        type: "small",
        id: 2,
        hit: false,
      };
      selectedSmallShipDirection = 2;
    } else if (selectedSmallShipDirection == 1) {
      selectedSmallShipDirection = 0;
    }
  } while (selectedSmallShipDirection == 0 || selectedSmallShipDirection == 1);
  // if medium board size add another small ship
  if (table.length == 5) {
    addSecondSmallShip(generateBoard(5));
  }
  // if large board size add another large ship
  if (table.length == 6) {
    addSecondSmallShip(generateBoard(6));
    addSecondLargeShip(generateBoard(6));
  }
};

welcome();
chooseBoardSize();

if (boardSizeSelection == "4x4") {
  generateShips(generateBoard(4));
  console.table(boardDisplayHitOrMiss(generateBoard(4), false));
} else if (boardSizeSelection == "5x5") {
  generateShips(generateBoard(5));
  console.table(boardDisplayHitOrMiss(generateBoard(5), false));
} else if (boardSizeSelection == "6x6") {
  generateShips(generateBoard(6));
  console.table(boardDisplayHitOrMiss(generateBoard(6), false));
}

//get user input to start the guessing of the board

const userGuess = readlineSync
  .question("Enter a coordinate (i.e. C3): ")
  .toUpperCase();
