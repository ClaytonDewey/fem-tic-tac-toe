export const getGameState = (squares, currentPlayer) => {
  const winnerResult = calculateWinner(squares);
  const winner = winnerResult?.winner || null;
  const winningLine = winnerResult?.line || [];
  const turns = calculateTurns(squares);
  const status = calculateStatus(winner, turns, currentPlayer);

  const isDraw = !winner && turns === 0;
  const isGameOver = Boolean(winner || isDraw);

  return {
    winner,
    winningLine,
    turns,
    status,
    isDraw,
    isGameOver,
  };
};

export const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winner: squares[a],
        line: lines[i],
      };
    }
  }
  return null;
};

export const calculateTurns = (squares) => {
  return squares.filter((square) => !square).length;
};

export const calculateStatus = (winner, turns, player) => {
  if (!winner && !turns) return 'Draw';
  if (winner) return `Winner ${winner}`;
  return `Next player: ${player}`;
};
