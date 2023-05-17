import { SNAKE_SPEED, GAME_OVER, SNAKE_BODY, resetDirection, setGameOver, generateSnake, moveSnake } from "./snake.js";
import { FOOD_POSITION, generateFood } from "./food.js";

let gameOverExecuted = false;
let previousTime = 0;
let BOARD_SIZE = 14;
const MIN_BOARD_SIZE = 8;
const MAX_BOARD_SIZE = 20;

const board = document.getElementById("game-board");
board.style.setProperty("--board-size", BOARD_SIZE);

const boardSizeButton = document.getElementById("board-size");
boardSizeButton.addEventListener("click", () => {
    createPopup();
})

const popup = document.createElement("div");
popup.id = "popup";
const dimElement = document.createElement("div");
dimElement.id = "dim-element";

function createBoard() { 
    board.innerHTML = "";
    
    for (let i = 0; i < BOARD_SIZE; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < BOARD_SIZE; j++) {
            const cell = document.createElement("td");

            // for checkerboard pattern
            // if ((i + j) % 2 === 0) {
            //     cell.classList.add("light");
            // } else {
            //     cell.classList.add("dark");
            // }

            row.appendChild(cell);
        }
        board.appendChild(row);
    }

    generateSnake(BOARD_SIZE);
    generateFood(BOARD_SIZE);
    while (SNAKE_BODY[0].x === FOOD_POSITION.x && SNAKE_BODY[0].y === FOOD_POSITION.y) {
        generateFood(BOARD_SIZE);
    }
}

function createPopup() {
    popup.innerHTML = `
        <label for="board-size">Board size:</label>
        <input type="number" id="size-input" value="${BOARD_SIZE}">
        <button id="confirm-button">Confirm</button>
        <span id='close-button'>&times;</span>
        <span id="warning-message" style="color: red; display: none;">Please enter a valid board size</span>
    `;    

    const closeButton = popup.querySelector('#close-button');
    closeButton.addEventListener('click', function() {
        popup.remove();
        dimElement.remove();
    });

    const sizeInput = popup.querySelector('#size-input');
    const warningMessage = popup.querySelector('#warning-message');

    sizeInput.addEventListener('blur', function() {
        const boardSize = parseInt(sizeInput.value);
        if (isNaN(boardSize)) {
            warningMessage.style.display = 'block';
        } else if (boardSize < MIN_BOARD_SIZE) {
            sizeInput.value = MIN_BOARD_SIZE;
            warningMessage.style.display = 'none';
        } else if (boardSize > MAX_BOARD_SIZE) {
            sizeInput.value = MAX_BOARD_SIZE;
            warningMessage.style.display = 'none';
        } else {
            sizeInput.value = boardSize;
            warningMessage.style.display = 'none';
        }
    });

    const confirmButton = popup.querySelector('#confirm-button');
    confirmButton.addEventListener('click', function() {
        BOARD_SIZE = parseInt(sizeInput.value);
        if (isNaN(BOARD_SIZE)) {
            warningMessage.style.display = 'block';
            return
        } 
        warningMessage.style.display = 'none';
        if (BOARD_SIZE < MIN_BOARD_SIZE) {
            BOARD_SIZE = MIN_BOARD_SIZE;
            sizeInput.value = BOARD_SIZE;
        } else if (BOARD_SIZE > MAX_BOARD_SIZE) {
            BOARD_SIZE = MAX_BOARD_SIZE;
            sizeInput.value = BOARD_SIZE;
        }
        resetDirection();
        createBoard()
        popup.remove();
        dimElement.remove();
    });

    document.body.appendChild(dimElement)
    document.body.appendChild(popup);
}

function gameOverPopup() {
    popup.innerHTML = `
        <label>Score:</label> 0
        <button id="confirm-button">Play Again</button>
        <span id='close-button'>&times;</span>
    `;    

    // temporarily disabled
    // const closeButton = popup.querySelector('#close-button');
    // closeButton.addEventListener('click', function() {
    //     popup.remove();
    //     dimElement.remove();
    // });

    const playButton = popup.querySelector('#confirm-button');
    playButton.addEventListener('click', function() {
        setGameOver(false);
        gameOverExecuted = false;

        resetDirection();
        createBoard()
        popup.remove();
        dimElement.remove();
    });

    document.body.appendChild(dimElement)
    document.body.appendChild(popup);
}

function updateBoard() {
    if (GAME_OVER && !gameOverExecuted) {
        gameOverPopup();
        gameOverExecuted = true;
    } else if (!GAME_OVER) {
        moveSnake(BOARD_SIZE);
    }
}

function main(currentTime) {
    window.requestAnimationFrame(main);
    const deltaTime = (currentTime - previousTime) / 1000;
    if (deltaTime < 1 / SNAKE_SPEED) return;

    updateBoard();
    previousTime = currentTime;
}

createBoard();
window.requestAnimationFrame(main)