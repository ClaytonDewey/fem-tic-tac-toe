import { useState } from 'react';
import { Button, IconChoice } from '../components';
import { Icon } from '../svg';

const StartScreen = () => {
  const [playerIcon, setPlayerIcon] = useState('O');
  const icons = ['X', 'O'];

  return (
    <div className='start'>
      <Icon name='logo' />
      <div className='card'>
        <h1>pick player 1&apos;s mark</h1>
        <div className='btn-container'>
          {icons.map((icon) => (
            <IconChoice
              key={icon}
              icon={icon}
              selected={playerIcon === icon}
              onSelect={setPlayerIcon}
            />
          ))}
        </div>
        <p>remember : x goes first</p>
      </div>
      <Button type='button' className='btn btn-yellow'>
        New Game (vs CPU)
      </Button>
      <Button type='button' className='btn btn-blue'>
        New Game (vs Player)
      </Button>
    </div>
  );
};
export default StartScreen;
