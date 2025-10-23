import { Routes, Route } from 'react-router-dom';
import { StartScreen, PlayScreen } from './pages/';

function App() {
  return (
    <Routes>
      <Route path='/' element={<StartScreen />} />
      <Route path='/play' element={<PlayScreen />} />
    </Routes>
  );
}

export default App;
