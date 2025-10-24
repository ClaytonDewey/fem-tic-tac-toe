import { Routes, Route } from 'react-router-dom';
import { StartScreen, PlayScreen } from './pages/';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<StartScreen />} />
        <Route path='/play' element={<PlayScreen />} />
      </Routes>
    </div>
  );
}

export default App;
