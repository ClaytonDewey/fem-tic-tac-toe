import { useState } from 'react';
import { Icon } from '../svg';
import { Button, Modal } from '.';
import useGameStore from '../store/useGameStore';

const GameHeader = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  const { quitSession } = useGameStore();
  const currentPlayer = useGameStore((state) => (state.xIsNext ? 'X' : 'O'));

  const renderContent = () => {
    return (
      <>
        <div className='modal__content-text'>
          <h3>Restart Game?</h3>
        </div>
      </>
    );
  };

  const handleQuit = () => {
    quitSession();
    toggleVisibility();
  };

  const renderActions = () => {
    return (
      <div className='btn-container'>
        <Button
          type='button'
          className='btn btn-secondary'
          onClick={toggleVisibility}>
          No, Cancel
        </Button>
        <Button type='button' className='btn btn-yellow' onClick={handleQuit}>
          Yes, Restart
        </Button>
      </div>
    );
  };

  return (
    <>
      <header className='header'>
        <Icon name='logo' />
        <div className='turn'>
          <Icon name={currentPlayer} /> Turn
        </div>
        <Button
          type='button'
          className='btn btn-reset'
          onClick={toggleVisibility}>
          <Icon name='restart' />
        </Button>
      </header>

      {isVisible && (
        <Modal content={renderContent()} actions={renderActions()} />
      )}
    </>
  );
};
export default GameHeader;
