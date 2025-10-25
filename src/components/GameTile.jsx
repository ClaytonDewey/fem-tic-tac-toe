import { Button } from '.';
import { Icon } from '../svg';

const GameTile = ({ icon }) => {
  return (
    <Button
      type='button'
      className={`btn btn-tile ${icon === 'O' ? 'blue' : 'yellow'}`}>
      {icon && <Icon name={icon} />}
    </Button>
  );
};
export default GameTile;
