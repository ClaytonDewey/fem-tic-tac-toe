import { Button, GameTile, Modal } from '.';
import { Icon } from '../svg';
import { calculateStatus, calculateTurns, calculateWinner } from '../utils';
import { useState } from 'react';

const GameGrid = ({ xIsNext, squares, onPlay }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const toggleModal = () => setIsModalVisible(!isModalVisible);
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

  const renderContent = () => {
    return (
      <>
        <div className='modal__content-text'>
          <h2 className={`ie ${winner === 'X' ? 'yellow' : 'blue'}`}>
            <Icon name={winner} /> takes the round
          </h2>
        </div>
      </>
    );
  };

  const renderActions = () => {
    return (
      <div className='btn-container'>
        <Button onClick={toggleModal} className='btn btn-secondary'>
          Quit
        </Button>
        <Button onClick={toggleModal} className='btn btn-yellow'>
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
            onSquareClick={() => handleClick(squareIndex)}
          />
        ))}
      </div>
      {isModalVisible && (
        <Modal
          title={status}
          content={renderContent()}
          actions={renderActions()}
          onDismiss={() => toggleModal()}
        />
      )}
    </>
  );
};
export default GameGrid;
