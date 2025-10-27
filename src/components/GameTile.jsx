import { Button } from '.';
import { Icon } from '../svg';

const GameTile = ({ value, onSquareClick }) => {
  return (
    <Button
      type='button'
      className={`btn btn-tile ${value === 'O' ? 'blue' : 'yellow'}`}
      onClick={onSquareClick}>
      {value && <Icon name={value} />}
    </Button>
  );
};
export default GameTile;
