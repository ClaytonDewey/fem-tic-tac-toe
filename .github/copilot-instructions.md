# Tic-Tac-Toe Game - AI Coding Instructions

## Architecture Overview

This is a React tic-tac-toe game built with Create React App, using Zustand for state management and Sass for styling. The app follows a two-phase UI pattern: game setup → game board.

### State Management Pattern
- **Zustand Store** (`src/store/useGameStore.js`): Uses `combine()` middleware with derived state as functions, not getters
- **Derived State Functions**: `currentSquares()` and `gameState()` are called as functions, not accessed as properties
- **Game Logic Separation**: Pure game logic lives in `src/utils/getGameState.js`, store handles state transitions

### Component Architecture
- **Barrel Exports**: All components export through `src/components/index.js` for clean imports
- **SVG Icon System**: Centralized icon management via `src/svg/icon.jsx` with string-based name switching
- **Conditional Rendering**: App.js manages phase transitions with CSS classes (`hidden`, `fade-in`) and `setTimeout` delays

## Key Patterns

### State Access Pattern
```javascript
// Correct: Call derived state as functions
const squares = currentSquares();
const { winner, isDraw } = gameState();

// Wrong: Don't treat as properties
const squares = currentSquares; // This returns the function itself
```

### Component Import Pattern
```javascript
// Preferred: Use barrel exports
import { GameGrid, Modal, Button } from '.';
import { Icon } from '../svg';

// Avoid: Direct file imports when barrel exists
import GameGrid from './GameGrid';
```

### Styling Conventions
- **SCSS Architecture**: 7-1 pattern with `@use` imports in `src/sass/style.scss`
- **CSS Variables**: Defined in `abstracts/variables.scss` using BEM-like naming (`--clr-blue-500`)
- **Component Classes**: Follow BEM methodology (`game__board-grid`, `btn-yellow`)

### Game State Logic
- **Move Validation**: Always check `isGameOver` and existing square values before allowing moves
- **History Management**: Zustand store maintains move history for potential undo/replay features
- **Status Calculation**: Pure functions in `getGameState.js` handle winner detection and status messages
- **Modal Display**: Modal automatically shows when `isGameOver` is true (winner or draw)

### Planned Features
- **CPU Game Mode**: Setup UI exists but CPU logic not yet implemented - focus on player vs player for now

## Development Commands

```bash
npm start          # Development server on localhost:3000
npm run build      # Production build
npm test           # Run tests
```

## File Organization
- `/src/components/` - React components with barrel exports
- `/src/store/` - Zustand state management
- `/src/utils/` - Pure utility functions
- `/src/svg/` - SVG components and icon management
- `/src/sass/` - SCSS files following 7-1 architecture