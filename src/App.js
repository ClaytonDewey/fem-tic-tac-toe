import { useState } from 'react';
import { IconChoice, Button, GameBoard } from './components';
import { Icon } from './svg';

function App() {
  const [playerIcon, setPlayerIcon] = useState('');
  const [gameMode, setGameMode] = useState(null);
  const [showBoard, setShowBoard] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const icons = ['X', 'O'];
  const gameModes = [
    { label: 'New Game (vs CPU)', color: 'yellow', mode: 'cpu' },
    { label: 'New Game (vs Player)', color: 'blue', mode: 'player' },
  ];

  const handleIconSelect = (icon) => {
    setPlayerIcon(icon);
    setIsDisabled(false);
  };

  const handleGameModeSelect = (mode) => {
    setGameMode(mode);

    setTimeout(() => {
      setShowBoard(true);
    }, 600);
  };

  return (
    <div className='App'>
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
                onSelect={() => handleIconSelect(icon)}
              />
            ))}
          </div>
          <p>remember : x goes first</p>
        </div>

        {gameModes.map(({ label, color, mode }) => (
          <Button
            disabled={isDisabled}
            key={mode}
            className={`btn btn-${color}`}
            onClick={() => handleGameModeSelect(mode)}>
            {label}
          </Button>
        ))}
      </div>

      <div className={`game__board ${showBoard ? 'fade-in' : ''}`}>
        <GameBoard />
      </div>
    </div>
  );
}

export default App;
