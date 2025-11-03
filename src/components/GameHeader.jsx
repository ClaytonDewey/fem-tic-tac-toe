import { Icon } from '../svg';
import { Button } from '.';
import useGameStore from '../store/useGameStore';

const GameHeader = () => {
  const currentPlayer = useGameStore((state) => (state.xIsNext ? 'X' : 'O'));
  const { undoMove } = useGameStore();
  return (
    <header className='header'>
      <Icon name='logo' />
      <div className='turn'>
        <Icon name={currentPlayer} /> Turn
      </div>
      <Button type='button' className='btn btn-reset' onClick={undoMove}>
        <Icon name='restart' />
      </Button>
    </header>
  );
};
export default GameHeader;
