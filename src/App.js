import { Button } from './components';
// import { Icon } from './svg';

function App() {
  return (
    <div className='App'>
      {/* <Button className='btn'>
        <Icon name='restart' />
        <span className='sr-only'>Restart</span>
      </Button> */}
      <Button className='btn btn-yellow'>New Game (vs CPU)</Button>
      <Button className='btn btn-blue'>New Game (vs Player)</Button>
    </div>
  );
}

export default App;
