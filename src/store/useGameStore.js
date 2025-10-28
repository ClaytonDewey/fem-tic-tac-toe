import { create } from 'zustand';
import { combine } from 'zustand/middleware';
import { getGameState } from '../utils/getGameState';

const useGameStore = create(
  combine(
    {
      history: [Array(9).fill(null)],
      currentMove: 0,
      xIsNext: true,
    },
    (set, get) => ({
      // --- Derived state as FUNCTIONS (not getters) ---
      currentSquares: () => {
        const { history, currentMove } = get();
        return history[currentMove];
      },

      gameState: () => {
        const squares = get().currentSquares();
        const currentPlayer = get().xIsNext ? 'X' : 'O';
        return getGameState(squares, currentPlayer);
      },

      // --- Actions ---
      makeMove: (index) => {
        const { currentSquares, history, currentMove, xIsNext, gameState } =
          get();
        const squares = currentSquares();
        const state = gameState();

        // Ignore invalid clicks
        if (state.isGameOver || squares[index]) return;

        const nextSquares = squares.slice();
        nextSquares[index] = xIsNext ? 'X' : 'O';
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];

        set({
          history: nextHistory,
          currentMove: nextHistory.length - 1,
          xIsNext: !xIsNext,
        });
      },

      jumpTo: (move) => {
        set({
          currentMove: move,
          xIsNext: move % 2 === 0,
        });
      },

      resetGame: () => {
        set({
          history: [Array(9).fill(null)],
          currentMove: 0,
          xIsNext: true,
        });
      },
    })
  )
);

export default useGameStore;
