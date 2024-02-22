// types
import { GameCellType } from './game.types';

const GAME_CELLS = 9;

export const CELL_X = 'X';
export const CELL_O = 'O';
export const CELL_EMPTY = '';

export const CELLS: GameCellType[] = Array.from({ length: GAME_CELLS }, (_, idx) => ({
  id: idx,
  value: CELL_EMPTY,
  turnIdx: -1,
}));
