const model = {
  ladders: [],
  drawingSequence: [
    90, 89, 88, 87, 86, 85, 84, 83, 82, 73, 74, 75, 76, 77, 78, 79, 80, 81, 72,
    71, 70, 69, 68, 67, 66, 65, 64, 55, 56, 57, 58, 59, 60, 61, 62, 63, 54, 53,
    52, 51, 50, 49, 48, 47, 46, 37, 38, 39, 40, 41, 42, 43, 44, 45, 36, 35, 34,
    33, 32, 31, 30, 29, 28, 19, 20, 21, 22, 23, 24, 25, 26, 27, 18, 17, 16, 15,
    14, 13, 12, 11, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9,
  ],
  ladders: {
    1: 40,
    8: 10,
    24: 5,
    36: 52,
    43: 62,
    49: 79,
    65: 82,
    68: 85,
    33: 3,
    74: 12,
    64: 27,
    42: 30,
    56: 37,
    87: 70,
  },
  diceValue: 6,
  players: [
    { position: 0, color: "green" },
    { position: 0, color: "red" },
    { position: 0, color: "blue" },
    { position: 0, color: "purple" },
  ],
  currentPlayerIndex: 0,
  canRollDice: true,
  canMovePlayer: false,
};

function movePlayerWithLadders(player, newPosition) {
  if (model.ladders[newPosition] !== undefined) {
    console.log(
      `${player.color} fant en stige på ${newPosition} som gikk til ${model.ladders[newPosition]}`
    );
    newPosition = model.ladders[newPosition];
  }
  player.position = newPosition;
  drawBoard();
}

function getDiceSymbol(value) {
  const symbols = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];
  return symbols[value - 1];
}

function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

function checkWin(player) {
  const winningPosition = 90;
  if (player.position >= winningPosition) {
    alert(`${player.color} har vunnet!`);
  }
}

function getCssClassForCell(cellNumber) {
  if (cellNumber === 90) {
    return "finish";
  } else if (model.ladders[cellNumber]) {
    const ladderTo = model.ladders[cellNumber];
    if (ladderTo > cellNumber) {
      return "ladderStartUp";
    } else {
      return "ladderStartDown";
    }
  } else if (Object.values(model.ladders).includes(cellNumber)) {
    if (
      cellNumber >
      Object.keys(model.ladders).find(
        (key) => model.ladders[key] === cellNumber
      )
    ) {
      return "ladderEndUp";
    } else {
      return "ladderEndDown";
    }
  } else {
    return "";
  }
}
