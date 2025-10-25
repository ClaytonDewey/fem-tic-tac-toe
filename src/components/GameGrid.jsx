import { GameTile } from '.';

const GameGrid = () => {
  return (
    <div className='game__board-grid'>
      <GameTile icon='X' />
      <GameTile icon='O' />
      <GameTile icon='O' />
      <GameTile icon='X' />
      <GameTile />
      <GameTile />
      <GameTile icon='X' />
      <GameTile />
      <GameTile />
    </div>
  );
};
export default GameGrid;
