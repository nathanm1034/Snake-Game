export let FOOD_POSITION;

const board = document.getElementById("game-board");
const foodElement = document.createElement("div");
foodElement.classList.add("food");

export function generateFood(BOARD_SIZE) {
    const foodCol = Math.floor(Math.random() * BOARD_SIZE);
    const foodRow = Math.floor(Math.random() * BOARD_SIZE);

    FOOD_POSITION = {x: foodCol, y: foodRow};
    const cell = board.rows[foodRow].cells[foodCol];
    cell.appendChild(foodElement);
}