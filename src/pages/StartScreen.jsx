import { useState } from 'react';
import { IconChoice, Button } from '../components';
import { Icon } from '../svg';
import PlayScreen from './PlayScreen';

const StartScreen = () => {
  const [playerIcon, setPlayerIcon] = useState('O');
  const [gameMode, setGameMode] = useState(null);
  const [showBoard, setShowBoard] = useState(false);
  const icons = ['X', 'O'];
  const gameModes = [
    { label: 'New Game (vs CPU)', color: 'yellow', mode: 'cpu' },
    { label: 'New Game (vs Player)', color: 'blue', mode: 'player' },
  ];

  const handleGameModeSelect = (mode) => {
    setGameMode(mode);

    setTimeout(() => {
      setShowBoard(true);
    }, 600);
  };

  return (
    <>
      <div className={`start ${gameMode ? 'hidden' : ''}`}>
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

        {gameModes.map(({ label, color, mode }) => (
          <Button
            key={mode}
            className={`btn btn-${color}`}
            onClick={() => handleGameModeSelect(mode)}>
            {label}
          </Button>
        ))}
      </div>

      <div className={`game__board ${showBoard ? 'fade-in' : ''}`}>
        <PlayScreen />
      </div>
    </>
  );
};
export default StartScreen;
