const board = document.getElementById('board');
const status = document.getElementById('status');
let currentPlayer = 'X';
let gameState = Array(9).fill(null);
let gameActive = true;

const winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
function createBoard() {
    board.innerHTML = '';
    gameState.forEach((_, index)=> {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = index;
        cell.addEventListener('click',handleCellClick);
        board.appendChild(cell);
    });
}
function handleCellClick(event) {
    const cell = event.target;
    const index = cell.dataset.index;

    if (gameState[index] || !gameActive) return;

    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add('taken');


  if (checkWin()) {
    status.textContent = `Player ${currentPlayer} Wins!`;
    gameActive = false;
    return;
  }

  if (gameState.every(cell => cell)) {
    status.textContent = 'It\'s a Draw!';
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  status.textContent = `Player ${currentPlayer}'s turn`;
}



  function checkWin() {
  return winningConditions.some(condition => {
    const [a, b, c] = condition;
    return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
  });
}

function resetGame() {
  gameActive = true;
  currentPlayer = 'X';
  gameState.fill(null);
  status.textContent = "player X's turn";
  createBoard();
  }
  
  createBoard();

