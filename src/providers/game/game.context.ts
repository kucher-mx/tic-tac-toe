import React from 'react';

// consts
import { CELLS, CELL_O, GAME_NOT_STARTED } from './game.conts';

// types
import { GameContextType } from './game.types';

export const gameContext = React.createContext<GameContextType>({
  // game cells
  cells: CELLS,
  makeMove: () => {},

  // game data
  playerSign: CELL_O,
  currentMove: CELL_O,
  currentMoveEndsIn: 0,
  gameStatus: GAME_NOT_STARTED,

  // game methods
  surrender: () => {},
  resetGameField: () => {},
});

export const useGameContext = () => {
  const context = React.useContext(gameContext);

  if (!context) throw new Error('gameContext should be used within GameProvider');

  return context;
};
