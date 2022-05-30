const container = document.getElementById("container");

const resolution = 40;
const squareSize = container.offsetHeight / resolution;

const snake = new Snake();

let food = [];

window.document.addEventListener("keypress", (e) => {
  switch (e.key) {
    case "w":
      snake.changeDirection("up");
      break;
    case "a":
      snake.changeDirection("left");
      break;
    case "s":
      snake.changeDirection("down");
      break;
    case "d":
      snake.changeDirection("right");
      break;
    default:
      break;
  }
});

const printSnake = (snake) => {
  snake.cells.forEach(([x, y], index) => {
    let newCell = document.createElement("div");
    newCell.id = `cell:(${x},${y})`;
    newCell.style.position = "absolute";
    newCell.style.left = `${x * squareSize}px`;
    newCell.style.top = `${y * squareSize}px`;
    newCell.style.width = `${squareSize}px`;
    newCell.style.height = `${squareSize}px`;
    newCell.style.backgroundColor = "#000000";
    newCell.style.zIndex = "10";

    if (snake.cells.length === 1) {
      newCell.style.borderRadius = "50%";
    } else {
      if (index === snake.cells.length - 1) {
        if (snake.xVel === 1) newCell.style.borderRadius = "0 50% 50% 0";
        if (snake.xVel === -1) newCell.style.borderRadius = "50% 0 0 50%";
        if (snake.yVel === 1) newCell.style.borderRadius = "0 0 50% 50%";
        if (snake.yVel === -1) newCell.style.borderRadius = "50% 50% 0 0";
      }
    }
    container.appendChild(newCell);
  });
};

const printFood = () => {
  const foodDiv = document.createElement("div");
  foodDiv.className = "food";
  foodDiv.id = `food:(${food[0]},${food[1]})`;
  foodDiv.style.position = "absolute";
  foodDiv.style.left = `${food[0] * squareSize}px`;
  foodDiv.style.top = `${food[1] * squareSize}px`;
  foodDiv.style.width = `${squareSize}px`;
  foodDiv.style.height = `${squareSize}px`;
  foodDiv.style.backgroundColor = "#ff0000";
  foodDiv.style.zIndex = "1";
  foodDiv.style.borderRadius = "50%";

  container.appendChild(foodDiv);
};

const lost = (snake) => {
  const touchedWall =
    snake.head[0] >= resolution ||
    snake.head[1] >= resolution ||
    snake.head[0] < 0 ||
    snake.head[1] < 0;

  let touchedBody = false;

  snake.cells.forEach(([x, y], index) => {
    if (index !== snake.cells.length - 1)
      if (snake.head[0] === x && snake.head[1] === y) {
        touchedBody = true;
      }
  });

  if (touchedWall || touchedBody) {
    snake.hatch();
    window.alert("lost");
    return true;
  }

  return false;
};

const generateFood = () => {
  let validPosition = true;
  do {
    const positionX = Math.floor(Math.random() * resolution);
    const positionY = Math.floor(Math.random() * resolution);

    snake.cells.forEach(([x, y]) => {
      if (x === positionX && y === positionY) {
        validPosition = false;
      }
    });
    if (validPosition) {
      food = [positionX, positionY];
    }
  } while (!validPosition);
};

const verifyEating = () => {
  if (snake.head[0] === food[0] && snake.head[1] === food[1]) {
    snake.eat();
    generateFood();
  } else {
    snake.move();
  }
};

const startGame = () => {
  let keepPlaying = true;
  generateFood();

  setInterval(() => {
    container.innerHTML = "";
    if (lost(snake)) {
      keepPlaying = false;
    }
    printFood();
    printSnake(snake);
    verifyEating();
  }, 100);
};

startGame();
