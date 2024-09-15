const board = document.getElementById('board');
const message = document.getElementById('message');
const restartButton = document.getElementById('restartButton');
let currentPlayer = 'X'; // Player starts first
let gameState = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

function createBoard() {
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-cell-index', i);
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
    }
}

function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = cell.getAttribute('data-cell-index');

    if (gameState[cellIndex] !== '' || !isGameActive || currentPlayer === 'O') {
        return;
    }

    cell.textContent = currentPlayer;
    gameState[cellIndex] = currentPlayer;

    checkResult();

    if (isGameActive) {
        currentPlayer = 'O'; // AI's turn
        setTimeout(aiMove, 500); // Adding delay for AI move
    }
}

function aiMove() {
    const emptyCells = gameState.map((cell, index) => cell === '' ? index : null).filter(index => index !== null);
    const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];

    if (randomIndex !== undefined) {
        const cell = document.querySelector(`[data-cell-index='${randomIndex}']`);
        cell.textContent = currentPlayer;
        gameState[randomIndex] = currentPlayer;

        checkResult();
        if (isGameActive) {
            currentPlayer = 'X'; // Player's turn
        }
    }
}

function checkResult() {
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            message.textContent = `${currentPlayer} wins!`;
            isGameActive = false;
            return;
        }
    }

    if (!gameState.includes('')) {
        message.textContent = "It's a draw!";
        isGameActive = false;
        return;
    }
}

function restartGame() {
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    message.textContent = '';
    board.innerHTML = '';
    createBoard();
}

restartButton.addEventListener('click', restartGame);
createBoard();
