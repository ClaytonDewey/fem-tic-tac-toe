import { Button } from '../components';
import { Icon } from '../svg';

const StartScreen = () => {
  return (
    <div className='App'>
      <Icon name='logo' />
      <div className='card start'>
        <h1>pick player 1&apos;s mark</h1>
        <div className='btn-container'>
          <Button className='btn'>
            <Icon name='X' />
            <span className='sr-only'>X</span>
          </Button>
          <Button className='btn active'>
            <Icon name='o-outline' />
            <span className='sr-only'>O</span>
          </Button>
        </div>
        <p>remember : x goes first</p>
      </div>
      <Button className='btn btn-yellow'>New Game (vs CPU)</Button>
      <Button className='btn btn-blue'>New Game (vs Player)</Button>
    </div>
  );
};
export default StartScreen;
