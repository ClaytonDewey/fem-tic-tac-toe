import { Icon } from '../svg';
import { Button } from '.';

const GameHeader = ({ xIsNext }) => {
  return (
    <header className='header'>
      <Icon name='logo' />
      <div className='turn'>
        <Icon name={xIsNext ? 'X' : 'O'} /> Turn
      </div>
      <Button type='button' className='btn btn-secondary'>
        <Icon name='restart' />
      </Button>
    </header>
  );
};
export default GameHeader;
