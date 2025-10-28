import { Button } from '.';
import { Icon } from '../svg';

const GameTile = ({ value, isWinning, onSquareClick }) => {
  const baseClass = `btn btn-tile ${value === 'X' ? 'blue' : 'yellow'}`;
  const className = isWinning ? `${baseClass} winner` : baseClass;

  return (
    <Button type='button' className={className} onClick={onSquareClick}>
      {value && <Icon name={value} />}
    </Button>
  );
};
export default GameTile;
