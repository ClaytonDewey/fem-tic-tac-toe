import { Button, GameTile, Modal } from '.';
import { Icon } from '../svg';
import useGameStore from '../store/useGameStore';

const GameGrid = () => {
  const { currentSquares, makeMove, clearBoard, quitSession, gameState } =
    useGameStore();

  const squares = currentSquares();
  const { status, winner, winningLine, isDraw, isGameOver } = gameState();

  const handleClick = (i) => {
    makeMove(i);
  };

  let statusClass = '';
  if (winner === 'X') {
    statusClass = 'blue';
  } else if (winner === 'O') {
    statusClass = 'yellow';
  }

  const renderContent = () => {
    return (
      <>
        <div className='modal__header'>
          <h2>{status}</h2>
        </div>

        <div className='modal__content-text'>
          <h3 className={`${statusClass} ${isDraw ? 'draw' : ''}`}>
            {isDraw ? (
              <>Round Tied</>
            ) : (
              <>
                <Icon name={winner} /> takes the round
              </>
            )}
          </h3>
        </div>
      </>
    );
  };

  const renderActions = () => {
    return (
      <div className='btn-container'>
        <Button
          type='button'
          className='btn btn-secondary'
          onClick={quitSession}>
          Quit
        </Button>
        <Button type='button' className='btn btn-yellow' onClick={clearBoard}>
          Next Round
        </Button>
      </div>
    );
  };

  return (
    <>
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
