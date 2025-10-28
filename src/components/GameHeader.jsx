import { Icon } from '../svg';
import { Button } from '.';

const GameHeader = ({ currentPlayer, resetGame }) => {
  return (
    <header className='header'>
      <Icon name='logo' />
      <div className='turn'>
        <Icon name={currentPlayer} /> Turn
      </div>
      <Button type='button' className='btn btn-secondary' onClick={resetGame}>
        <Icon name='restart' />
      </Button>
    </header>
  );
};
export default GameHeader;
