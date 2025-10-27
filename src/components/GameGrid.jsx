import { GameTile } from '.';
import { calculateStatus, calculateTurns, calculateWinner } from '../utils';

const GameGrid = ({ xIsNext, squares, onPlay }) => {
  const winner = calculateWinner(squares);
  const turns = calculateTurns(squares);
  const player = xIsNext ? 'X' : 'O';
  const status = calculateStatus(winner, turns, player);

  const handleClick = (i) => {
    if (squares[i] || winner) return;
    const nextSquares = squares.slice();
    nextSquares[i] = player;
    onPlay(nextSquares);
  };

  return (
    <div className='game__board-grid'>
      {squares.map((square, squareIndex) => (
        <GameTile
          key={squareIndex}
          value={square}
          onSquareClick={() => handleClick(squareIndex)}
        />
      ))}
    </div>
  );
};
export default GameGrid;
