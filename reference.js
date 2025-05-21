function randomIndexFromNestedArr(arrOfArr) {
  //randomize array selection
  const rIndexArr = Math.floor(Math.random() * arrOfArr.length);
  const selectedArr = arrOfArr[rIndexArr];
  //randomize index inside selected array
  const rIndex = Math.floor(Math.random() * selectedArr.length);
  selectedArr[rIndex] = { type: "large", id: 1, hit: false };
  //create an array of locations around selected location
  let leftIndex;
  let topIndex;
  let rightIndex;
  let bottomIndex;
  if ((selectedArr[rIndex - 1] = undefined)) {
    leftIndex = selectedArr[rIndex + 2];
  } else {
    leftIndex = selectedArr[rIndex - 1];
  }
  if ((arrOfArr[rIndex - 1][rIndex] = undefined)) {
    topIndex = arrOfArr[rIndexArr + 2][rIndex];
  } else {
    arrOfArr[rIndexArr - 1][rIndex];
  }
  if ((selectedArr[rIndex + 1] = undefined)) {
    rightIndex = selectedArr[rIndex - 2];
  } else {
    rightIndex = selectedArr[rIndex + 1];
  }
  if ((arrOfArr[rIndexArr + 1][rIndex] = undefined)) {
    bottomIndex = arrOfArr[rIndexArr - 2][rIndex];
  } else {
    bottomIndex = arrOfArr[rIndexArr + 1][rIndex];
  }
  const otherLargeIndex = [leftIndex, topIndex, rightIndex, bottomIndex];
  //if the surrounding locations are not on the board move the option to be on the other side of the selection ie. rIndex is 3 the right will be undefined so give location of right as left twice.
  /* if (otherLargeIndex[0] == undefined) {
      otherLargeIndex[0] = selectedArr[rIndex + 2];
    }
    if (otherLargeIndex[1] == undefined) {
      otherLargeIndex[1] = arrOfArr[rIndexArr + 2][rIndex];
    }
    if (otherLargeIndex[2] == undefined) {
      otherLargeIndex[2] = selectedArr[rIndex - 2]
    if (otherLargeIndex[3] == undefined) {
      otherLargeIndex[3] = arrOfArr[rIndexArr - 2][rIndex];
    }*/
  // select one random of the additional locations and use the other correspoding location as selected
}

randomIndexFromNestedArr(board4x4);
console.log(board4x4);

/*
  function buildBoard() {
    const placements = {
      A: [1, 2, 3, 4],
      B: [5, 6, 7, 8],
      C: [9, 10, 11, 12],
      D: [13, 14, 15, 16],
    };
    // generate a random number to be replace with a $ to start building locations for our ships
    const newKey =
      Object.keys(placements)[
        Math.floor(Math.random() * Object.keys(placements).length)
      ];
    const newIndex = Math.floor(Math.random() * placements[newKey].length);
    // swap the value for the random location and record the location swapped to be able to build the rest of the boat.
    let largeReplacedValue = "$";
    [placements[newKey][newIndex], largeReplacedValue] = [
      largeReplacedValue,
      placements[newKey][newIndex],
    ];
    // get 2 other positions for the large ship by locating the surrounding numbers
    const otherLargeShipPosition = [
      largeReplacedValue - 1,
      largeReplacedValue - 4,
      largeReplacedValue + 1,
      largeReplacedValue + 4,
    ];
  
    let largeRow;
    let largeIndex;
  
    for (const key in placements) {
      const index = placements[key].indexOf("$");
      if (index !== -1) {
        largeRow = key;
        largeIndex = index;
      }
    }
    const otherLargeShipPosition = [];
  
    if (largeRow == "A" && largeIndex == 0) {
      otherLargeShipPosition.push(
        placements.C[0],
        placements.A[1],
        placements.B[0],
        placements.A[2]
      );
    }
    if (largeRow == "A" && largeIndex != 0 && largeIndex != 3) {
      otherLargeShipPosition.push(
        placements.A[largeIndex - 1],
        placements.C[largeIndex],
        placements.A[largeIndex + 1],
        placements.B[largeIndex]
      );
    }
    if (largeRow == "A" && largeIndex == 3) {
      otherLargeShipPosition.push(placements.A[2]);
    }
    if (largeRow == "B" || (largeRow == "C" && largeIndex == 0)) {
    }
    if (largeRow == "B" || (largeRow == "C" && largeIndex == 3)) {
    }
    if (largeRow == "D" && largeIndex == 0) {
    }
    if (largeRow == "D" && largeIndex != 0 && largeIndex != 3) {
    }
    if (largeRow == "D" && largeIndex == 3) {
    }
  
    // choose one of the surrounding numbers
     const otherLargePositionIndex = Math.floor(
      Math.random() * otherLargeShipPosition.length
    );
    split the array in half and grab the other corresponding location based off the first randomized index;
    let frontLargeShip;
    let backLargeShip;
    const largeShipFirstHalf = otherLargeShipPosition.slice(0, 2);
    const largeShipSecondHalf = otherLargeShipPosition.slice(2);
    if (otherLargePositionIndex < 2) {
      frontLargeShip = largeShipFirstHalf[otherLargePositionIndex];
      backLargeShip = largeShipSecondHalf[otherLargePositionIndex];
    } else {
      frontLargeShip = largeShipFirstHalf[otherLargePositionIndex - 2];
      backLargeShip = largeShipSecondHalf[otherLargePositionIndex - 2];
    }
    switch (frontLargeShip) {
      case 0:
        frontLargeShip = 3;
    }
    //console.log(otherLargeShipPosition);
    //console.log(otherLargePositionIndex);
  
    console.log(placements);
    console.log(largeReplacedValue);
  }
  */

/*const num1 = Math.floor(Math.random() * (16 - 1 + 1)) + 1;
    for (const key in placements) {
      for (const val of placements[key]) {
        console.log(val);
        if (val == num1) {
          placements[key][val] = "$";
        }
      }
    }
  
    let num2;
    do {
      num2 = Math.floor(Math.random() * (16 - 1 + 1)) + 1;
    } while (num1 == num2);*/

let randomRowIndex2;
let selectedRow2;
let randomIndexSmall;
// make sure both random selected locations are not the same
do {
  randomRowIndex2 = randomIndex(table);
  selectedRow2 = table[randomRowIndex2];
  randomIndexSmall = randomIndex(selectedRow2);
} while (
  selectedRow2[randomIndexSmall] == { type: "large", id: 1, hit: false }
);
selectedRow2[randomIndexSmall] = { type: "small", id: 2, hit: false };
const smallShipDirection = [0, 1];
let selectedSmallShipDirection = randomIndex(smallShipDirection);
console.log(selectedSmallShipDirection);
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
