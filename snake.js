import { FOOD_POSITION, generateFood } from "./food.js";

export const SNAKE_SPEED = 10;
export let GAME_OVER = false;
export let SNAKE_BODY;

let snakeDirection = { x: 0, y: 0 };
let oldSnakeHead = { x: -1, y: -1};

const board = document.getElementById("game-board");
const snakeElement = document.createElement("div");
snakeElement.classList.add("snake");

window.addEventListener('keydown', e => {
    switch(e.key) {
        case 'ArrowUp':
            if (snakeDirection.y !== 0 || SNAKE_BODY[0].x === oldSnakeHead.x) break;
            oldSnakeHead.x = SNAKE_BODY[0].x;
            snakeDirection = { x: 0, y: -1 };
            break;
        case 'ArrowDown':
            if (snakeDirection.y !== 0 || SNAKE_BODY[0].x === oldSnakeHead.x) break;
            oldSnakeHead.x = SNAKE_BODY[0].x;
            snakeDirection = { x: 0, y: 1 };
            break;
        case 'ArrowLeft':
            if (snakeDirection.x !== 0 || SNAKE_BODY[0].y === oldSnakeHead.y) break;
            oldSnakeHead.y = SNAKE_BODY[0].y;
            snakeDirection = { x: -1, y: 0 };
            break;
        case 'ArrowRight':
            if (snakeDirection.x !== 0 || SNAKE_BODY[0].y === oldSnakeHead.y) break;
            oldSnakeHead.y = SNAKE_BODY[0].y;
            snakeDirection = { x: 1, y: 0 };
            break;
    }
});

export function resetDirection() {
    snakeDirection = { x: 0, y: 0 };
}

export function setGameOver(value) {
    GAME_OVER = value;
}

export function generateSnake(BOARD_SIZE) {
    const headCol = Math.floor(Math.random() * BOARD_SIZE);
    const headRow = Math.floor(Math.random() * BOARD_SIZE); 
    SNAKE_BODY = [{ x: headCol, y: headRow }]

    const cell = board.rows[SNAKE_BODY[0].y].cells[SNAKE_BODY[0].x];
    cell.appendChild(snakeElement);
}

export function moveSnake(BOARD_SIZE) {
    SNAKE_BODY[0].x += snakeDirection.x;
    SNAKE_BODY[0].y += snakeDirection.y;

    if (SNAKE_BODY[0].x >= BOARD_SIZE || SNAKE_BODY[0].x < 0 || SNAKE_BODY[0].y >= BOARD_SIZE || SNAKE_BODY[0].y < 0) {
        GAME_OVER = true;
        return;
    }

    const cell = board.rows[SNAKE_BODY[0].y].cells[SNAKE_BODY[0].x];
    cell.appendChild(snakeElement);

    if (SNAKE_BODY[0].x === FOOD_POSITION.x && SNAKE_BODY[0].y === FOOD_POSITION.y) {
        generateFood(BOARD_SIZE);
    }
}