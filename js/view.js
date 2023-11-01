function createPlayerSelectionButtons() {
    const body = document.querySelector('body');
    const buttonContainer = document.createElement('div');
    buttonContainer.id = 'buttonContainer';
    body.appendChild(buttonContainer);

    for (let i = 1; i <= 4; i++) {
        const button = document.createElement('button');
        button.classList.add('playerSelection');
        button.textContent = `${i} Player(s)`;
        button.addEventListener('click', () => {
            buttonContainer.innerHTML = ''; // Clear the buttonContainer's innerHTML to remove the buttons
            initializePlayers(i);
            drawBoard();
            createControls();
            addRollDiceListener();
            addMovePlayerListener();
            updateView();
        });
        buttonContainer.appendChild(button);
    }
}

function drawBoard() {
    const board = document.getElementById('board');
    const drawingSequence = model.drawingSequence;
    const playerSymbols = ['⛂', '♔', '♘', '♜'];
    let boardHTML = '';

    for (let i = 0; i < drawingSequence.length; i++) {
        const cellNumber = drawingSequence[i];
        const cssClass = getCssClassForCell(cellNumber);
        let cellHTML = '<div class="cell';

        if (cssClass) {
            cellHTML += ' ' + cssClass;
        }

        cellHTML += '"';

        if (!cssClass) {
            cellHTML += ' style="background-color: yellow"';
        }

        cellHTML += '>';

        for (let i = 0; i < model.players.length; i++) {
            const player = model.players[i];
            if (cellNumber === player.position) {
                cellHTML += `<span class="player" style="color: ${player.color}">${playerSymbols[i]}</span>`;
            }
        }

        if (!model.players.some(player => cellNumber === player.position)) {
            cellHTML += cellNumber;
        }

        cellHTML += '</div>';
        boardHTML += cellHTML;
    }

    board.innerHTML = boardHTML;
}

function createControls() {
    const controls = document.getElementById('controls');
    controls.innerHTML = /*html*/`
    <div id="dice"></div>
    <button id="rollDice">Roll Dice</button>
    <button id="movePlayer">Move Player</button>
    `;
}

function updateMessage(message) {
    document.getElementById('message').textContent = message;
}

function getMovePlayerElement() {
    return document.getElementById('movePlayer');
}

function getRollDiceElement() {
    return document.getElementById('rollDice');
}


function updateDice(diceValue) {
    const dice = document.getElementById('dice');
    dice.textContent = getDiceSymbol(diceValue);
}

function updateView() {
    updateDice(model.diceValue);
    drawBoard();
}
