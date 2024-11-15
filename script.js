const boardSize = 20;
const board = document.getElementById("board");

for (let index = 0; index < boardSize * boardSize; index++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    board.appendChild(cell);
}
//constantes de direcao
const DIREITA = { x: 1, y: 0 };
const ESQUERDA = { x: -1, y: 0 };
const CIMA = { x: 0, y: -1 };
const BAIXO = { x: 0, y: 1 };

//Cria o estado inicial
const initialState = { 
    snake: [{ x: 0, y: 0 }],
    direction: DIREITA,
    coffee: generateCoffee,
    gameOver: false,
};

function generateCoffee() {
    return {
        x: Math.floor(Math.random() * boardSize),
        y: Math.floor(Math.random() * boardSize),
    };
};

const desenhaTabuleiro = (state) => {
    const cells = document.querySelectorAll(".cell");

    const coffeeIndex = state.coffee.y * boardSize + state.coffee.x;
    cells[coffeeIndex].classList.add("coffee");

    const [cabeca, ...cauda] = state.snake;
    const index = cabeca.y * boardSize + cabeca.x;
    cells[index].classList.add("snake");

    //desenha os elementos da cauda
    cauda.forEach((segmento) => {
        const index = segmento.y * boardSize + segmento.x;
        cells[index].classList.add("cauda");
    });
};

const moveSnake = (snake, direction) => {
    const newHead = {
        x: snake[0].x = direction.x,
        y: snake[0].y + direction.y,
    };

    newHead.x = (newHead.x + boardSize) % boardSize
    newHead.y = (newHead.y + boardSize) % boardSize

    return [newHead, snake.slice(0, -1)];
};


const veColisao = (snake) => {
    const [cabeca, ...cauda] = snake;
    return cauda.some((segmento) => segmento.x ===cabeca.x && segmento.y === cabeca.y);
};

function generateCoffee() {
    return {
        x: Math.floor(math.random() * boardSize),
        y: Math.floor(math.random() * boardSize),
    }
}

const gameLoop = (state) => {
    if (state.gameOver) {
        alert("Game Over!");
        return;
    }

    const newSnake = moveSnake(state.snake, state.direction);

    // testar se ela bateu

    // cria café
    let newCoffee = state.coffee;

    // se captura cafe
    if (newSnake[0].x === state.coffee.x && newSnake[0].y === state. coffee.y) {
        newCoffee = generateCoffee();
        newSnake.push({ ...newSnake[newSnake.length - 1] });
    }

    const newState = {
        ...state,
        snake: newSnake,
        coffee: newCoffee,
    };

    desenhaTabuleiro(newState);
    setTimeout(() => gameLoop(newState), 1000);
};

const handleKeyPress = (event) => {
    const keyMap = {
        ArrowRight: DIREITA,
        ArrowLeft: ESQUERDA,
        ArrowUp: CIMA,
        ArrowDown: BAIXO,
    };

    if (keyMap[event.key]) {
        initialState.direction = keyMap[event.key];
    }
};

document.addEventListener("keydown", handleKeyPress);
desenhaTabuleiro(initialState);
gameLoop(initialState);


//board.style.backgroundcolor = "red";