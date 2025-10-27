import useGameStore from '../store/useGameStore';
import { GameHeader, GameGrid } from '.';

const GameBoard = () => {
  const history = useGameStore((state) => state.history);
  const setHistory = useGameStore((state) => state.setHistory);
  const currentMove = useGameStore((state) => state.currentMove);
  const setCurrentMove = useGameStore((state) => state.setCurrentMove);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  const handlePlay = (nextSquares) => {
    const nextHistory = history.slice(0, currentMove + 1).concat([nextSquares]);
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  };

  return (
    <>
      <GameHeader xIsNext={xIsNext} />
      <GameGrid
        xIsNext={xIsNext}
        squares={currentSquares}
        onPlay={handlePlay}
      />
    </>
  );
};
export default GameBoard;
