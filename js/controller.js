function handleRollDice(rollValue) {
    if (!model.canMovePlayer) {
        if (rollValue === undefined) {
            rollValue = rollDice();
        }

        model.diceValue = rollValue;
        model.canRollDice = false;
        model.canMovePlayer = true;
        updateView();
    } else {
        updateMessage("Du må flytte spiller først!");
    }
}
function handleMovePlayer() {
    if (model.canMovePlayer) {
        const currentPlayer = model.players[model.currentPlayerIndex];
        const newPosition = currentPlayer.position + model.diceValue;
        movePlayerWithLadders(currentPlayer, newPosition);
        console.log(`${currentPlayer.color} gikk fra ${currentPlayer.position - model.diceValue} til ${currentPlayer.position}`);
        checkWin(currentPlayer);
        model.canRollDice = true;
        model.canMovePlayer = false; 
        model.currentPlayerIndex = (model.currentPlayerIndex + 1) % model.players.length;
        updateView(model.diceValue);
    } else {
        updateMessage("Du må kaste terning først!");
    }
}

function addRollDiceListener() {
    const rollDiceButton = getRollDiceElement();
    rollDiceButton.addEventListener('click', () => handleRollDice());
}

function addMovePlayerListener() {
    const movePlayerButton = getMovePlayerElement();
    movePlayerButton.addEventListener('click', handleMovePlayer);
}

function initializePlayers(numPlayers) {
    model.players = [];
    const playerColors = ['green', 'red', 'blue', 'purple'];

    for (let i = 0; i < numPlayers; i++) {
        model.players.push({
            position: 0,
            color: playerColors[i % playerColors.length]
        });
    }
}




