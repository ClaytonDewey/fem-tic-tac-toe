import { create } from 'zustand';
import { combine, persist } from 'zustand/middleware';
import { getGameState } from '../utils/getGameState';

const useGameStore = create(
  persist(
    combine(
      {
        history: [Array(9).fill(null)],
        currentMove: 0,
        xIsNext: true,
        playerIcon: '', // Player 1's chosen icon (X or O)
        gameMode: null, // 'player' or 'cpu'
        isPlaying: false, // Whether a game is currently active
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
          const nextHistory = [
            ...history.slice(0, currentMove + 1),
            nextSquares,
          ];

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

        undoMove: () => {
          const { currentMove } = get();
          if (currentMove > 0) {
            const previousMove = currentMove - 1;
            set({
              currentMove: previousMove,
              xIsNext: previousMove % 2 === 0,
            });
          }
        },

        resetGame: () => {
          set({
            history: [Array(9).fill(null)],
            currentMove: 0,
            xIsNext: true,
            isPlaying: false,
            gameMode: null,
            playerIcon: '',
          });
        },

        clearBoard: () => {
          set({
            history: [Array(9).fill(null)],
            currentMove: 0,
            xIsNext: true,
          });
        },

        setPlayerIcon: (icon) => {
          set({ playerIcon: icon });
        },

        setGameMode: (mode) => {
          set({
            gameMode: mode,
            isPlaying: true,
          });
        },

        quitSession: () => {
          set({
            history: [Array(9).fill(null)],
            currentMove: 0,
            xIsNext: true,
            isPlaying: false,
            gameMode: null,
            playerIcon: '',
          });
        },

        endGame: () => {
          set({ isPlaying: false });
        },
      })
    ),
    {
      name: 'tic-tac-toe-game', // localStorage key
      partialize: (state) => ({
        history: state.history,
        currentMove: state.currentMove,
        xIsNext: state.xIsNext,
        playerIcon: state.playerIcon,
        gameMode: state.gameMode,
        isPlaying: state.isPlaying,
      }),
    }
  )
);

export default useGameStore;
