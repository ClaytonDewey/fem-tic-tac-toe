import { Button } from '.';
import { Icon } from '../svg';

const IconChoice = ({ icon, selected, onSelect }) => {
  return (
    <Button
      onClick={() => onSelect(icon)}
      type='button'
      className={`btn btn-choice ${selected ? 'active' : ''}`}>
      <Icon name={icon} />
      <span className='sr-only'>{icon}</span>
    </Button>
  );
};
export default IconChoice;
