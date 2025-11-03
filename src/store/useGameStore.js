import { create } from 'zustand';
import { combine, persist } from 'zustand/middleware';
import { getGameState } from '../utils/getGameState';
import { getCPUMove } from '../utils/cpuAI';

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
        scores: { X: 0, O: 0, draws: 0 }, // Track wins and draws
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
          const {
            currentSquares,
            history,
            currentMove,
            xIsNext,
            gameState,
            gameMode,
            playerIcon,
          } = get();
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

          // Handle CPU move if in CPU mode and it's CPU's turn next
          if (gameMode === 'cpu' && !state.isGameOver) {
            const cpuIcon = playerIcon === 'X' ? 'O' : 'X';
            const isNowCPUTurn = xIsNext ? cpuIcon === 'O' : cpuIcon === 'X';

            if (isNowCPUTurn) {
              // Delay CPU move for better UX
              setTimeout(() => {
                const currentState = get();
                const currentSquares = currentState.currentSquares();
                const currentGameState = currentState.gameState();

                // Check if game is still active
                if (!currentGameState.isGameOver) {
                  const cpuMoveIndex = getCPUMove(
                    currentSquares,
                    cpuIcon,
                    playerIcon
                  );

                  if (
                    cpuMoveIndex !== null &&
                    currentSquares[cpuMoveIndex] === null
                  ) {
                    const cpuSquares = [...currentSquares];
                    cpuSquares[cpuMoveIndex] = cpuIcon;
                    const cpuHistory = [
                      ...currentState.history.slice(
                        0,
                        currentState.currentMove + 1
                      ),
                      cpuSquares,
                    ];

                    set({
                      history: cpuHistory,
                      currentMove: cpuHistory.length - 1,
                      xIsNext: !currentState.xIsNext,
                    });
                  }
                }
              }, 500); // 500ms delay for CPU move
            }
          }
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
          const { gameState, scores, gameMode, playerIcon } = get();
          const { winner, isDraw } = gameState();

          // Update scores before clearing board
          let newScores = { ...scores };
          if (winner) {
            newScores[winner] += 1;
          } else if (isDraw) {
            newScores.draws += 1;
          }

          set({
            history: [Array(9).fill(null)],
            currentMove: 0,
            xIsNext: true,
            scores: newScores,
          });

          // If CPU mode and player chose O, CPU (X) goes first in new round
          if (gameMode === 'cpu' && playerIcon === 'O') {
            setTimeout(() => {
              const currentState = get();
              const squares = currentState.currentSquares();

              if (squares.every((square) => square === null)) {
                const cpuMoveIndex = getCPUMove(squares, 'X', 'O');
                if (cpuMoveIndex !== null) {
                  const cpuSquares = [...squares];
                  cpuSquares[cpuMoveIndex] = 'X';
                  const cpuHistory = [cpuSquares];

                  set({
                    history: cpuHistory,
                    currentMove: 0,
                    xIsNext: false, // Now it's O's turn (player)
                  });
                }
              }
            }, 500);
          }
        },

        setPlayerIcon: (icon) => {
          set({ playerIcon: icon });
        },

        setGameMode: (mode) => {
          const { playerIcon } = get();
          set({
            gameMode: mode,
            isPlaying: true,
          });

          // If CPU mode and player chose O, CPU (X) goes first
          if (mode === 'cpu' && playerIcon === 'O') {
            setTimeout(() => {
              const currentState = get();
              const squares = currentState.currentSquares();

              if (squares.every((square) => square === null)) {
                const cpuMoveIndex = getCPUMove(squares, 'X', 'O');
                if (cpuMoveIndex !== null) {
                  const cpuSquares = [...squares];
                  cpuSquares[cpuMoveIndex] = 'X';
                  const cpuHistory = [cpuSquares];

                  set({
                    history: cpuHistory,
                    currentMove: 0,
                    xIsNext: false, // Now it's O's turn (player)
                  });
                }
              }
            }, 500);
          }
        },

        quitSession: () => {
          set({
            history: [Array(9).fill(null)],
            currentMove: 0,
            xIsNext: true,
            isPlaying: false,
            gameMode: null,
            playerIcon: '',
            scores: { X: 0, O: 0, draws: 0 },
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
        scores: state.scores,
      }),
    }
  )
);

export default useGameStore;
