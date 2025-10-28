import { Button, GameTile, Modal } from '.';
import { Icon } from '../svg';
import useGameStore from '../store/useGameStore';

const GameGrid = () => {
  const { currentSquares, makeMove, resetGame, gameState } = useGameStore();

  const squares = currentSquares();
  const { winner, winningLine, status, isGameOver } = gameState();

  const handleClick = (i) => {
    makeMove(i);
  };

  const renderContent = () => {
    return (
      <>
        <div className='modal__content-text'>
          <h2 className={`${winner === 'X' ? 'blue' : 'yellow'}`}>
            <Icon name={winner} /> takes the round
          </h2>
        </div>
      </>
    );
  };

  const renderActions = () => {
    return (
      <div className='btn-container'>
        <Button type='button' className='btn btn-secondary'>
          Quit
        </Button>
        <Button type='button' className='btn btn-yellow' onClick={resetGame}>
          Next Round
        </Button>
      </div>
    );
  };

  return (
    <>
      <p>{status}</p>
      <div className='game__board-grid'>
        {squares.map((square, squareIndex) => (
          <GameTile
            key={squareIndex}
            value={square}
            isWinning={winningLine.includes(squareIndex)}
            onSquareClick={() => handleClick(squareIndex)}
          />
        ))}
      </div>

      {isGameOver && (
        <Modal content={renderContent()} actions={renderActions()} />
      )}
    </>
  );
};
export default GameGrid;
