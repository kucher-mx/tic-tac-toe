import React from 'react';

// consts
import { CELLS, CELL_O } from './game.conts';

// types
import { GameContextType } from './game.types';

export const gameContext = React.createContext<GameContextType>({
  // game cells
  cells: CELLS,
  updateCell: () => {},

  // game data
  playerSign: CELL_O,
  currentTurn: CELL_O,
  currentTurnEndsIn: 0,

  // game methods
  surrender: () => {},
});

export const useGameContext = () => {
  const context = React.useContext(gameContext);

  if (!context) throw new Error('gameContext should be used within GameProvider');

  return context;
};
