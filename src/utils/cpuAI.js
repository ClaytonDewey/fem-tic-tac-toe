import { calculateWinner } from './getGameState';

/**
 * CPU AI using minimax algorithm with alpha-beta pruning
 * @param {Array} squares - Current board state
 * @param {string} cpuPlayer - CPU's symbol ('X' or 'O')
 * @param {string} humanPlayer - Human's symbol ('X' or 'O')
 * @returns {number} Best move index for CPU
 */
export const getCPUMove = (squares, cpuPlayer, humanPlayer) => {
  // Easy difficulty: Random move with some strategy
  const availableMoves = squares
    .map((square, index) => (square === null ? index : null))
    .filter((val) => val !== null);

  if (availableMoves.length === 0) return null;

  // Check if CPU can win
  for (let move of availableMoves) {
    const testSquares = [...squares];
    testSquares[move] = cpuPlayer;
    if (calculateWinner(testSquares)?.winner === cpuPlayer) {
      return move;
    }
  }

  // Check if CPU needs to block human from winning
  for (let move of availableMoves) {
    const testSquares = [...squares];
    testSquares[move] = humanPlayer;
    if (calculateWinner(testSquares)?.winner === humanPlayer) {
      return move;
    }
  }

  // Take center if available
  if (squares[4] === null) {
    return 4;
  }

  // Take corners if available
  const corners = [0, 2, 6, 8];
  const availableCorners = corners.filter((corner) => squares[corner] === null);
  if (availableCorners.length > 0) {
    return availableCorners[
      Math.floor(Math.random() * availableCorners.length)
    ];
  }

  // Take any available move
  return availableMoves[Math.floor(Math.random() * availableMoves.length)];
};

/**
 * Advanced CPU AI using minimax algorithm
 * @param {Array} squares - Current board state
 * @param {string} cpuPlayer - CPU's symbol
 * @param {string} humanPlayer - Human's symbol
 * @returns {number} Best move index for CPU
 */
export const getCPUMoveHard = (squares, cpuPlayer, humanPlayer) => {
  const minimax = (
    board,
    depth,
    isMaximizing,
    alpha = -Infinity,
    beta = Infinity
  ) => {
    const winnerResult = calculateWinner(board);
    const winner = winnerResult?.winner;

    // Terminal states
    if (winner === cpuPlayer) return 10 - depth;
    if (winner === humanPlayer) return depth - 10;
    if (board.every((square) => square !== null)) return 0; // Draw

    if (isMaximizing) {
      let maxEval = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (board[i] === null) {
          board[i] = cpuPlayer;
          const evaluation = minimax(board, depth + 1, false, alpha, beta);
          board[i] = null;
          maxEval = Math.max(maxEval, evaluation);
          alpha = Math.max(alpha, evaluation);
          if (beta <= alpha) break; // Alpha-beta pruning
        }
      }
      return maxEval;
    } else {
      let minEval = Infinity;
      for (let i = 0; i < 9; i++) {
        if (board[i] === null) {
          board[i] = humanPlayer;
          const evaluation = minimax(board, depth + 1, true, alpha, beta);
          board[i] = null;
          minEval = Math.min(minEval, evaluation);
          beta = Math.min(beta, evaluation);
          if (beta <= alpha) break; // Alpha-beta pruning
        }
      }
      return minEval;
    }
  };

  let bestMove = -1;
  let bestValue = -Infinity;

  for (let i = 0; i < 9; i++) {
    if (squares[i] === null) {
      const testSquares = [...squares];
      testSquares[i] = cpuPlayer;
      const moveValue = minimax(testSquares, 0, false);

      if (moveValue > bestValue) {
        bestValue = moveValue;
        bestMove = i;
      }
    }
  }

  return bestMove;
};
