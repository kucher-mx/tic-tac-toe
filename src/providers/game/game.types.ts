import { CELL_X, CELL_O, CELL_EMPTY } from './game.conts';

export type CellsValueType = typeof CELL_X | typeof CELL_O | typeof CELL_EMPTY;
export type CellValueType = typeof CELL_X | typeof CELL_O;

export type GameCellType = {
  id: number;
  value: CellsValueType;
  turnIdx: number;
};
export type GameStateType = {
  playerSign: CellsValueType;
  currentTurn: CellsValueType;
  currentTurnEndsIn: number;
  currentTurnIdx: number;
};

export type GameContextType = {
  // game cells
  cells: GameCellType[];
  updateCell: (id: number, value: CellsValueType) => void;

  // game data
  playerSign: GameStateType['playerSign'];
  currentTurn: GameStateType['currentTurn'];
  currentTurnEndsIn: GameStateType['currentTurnEndsIn'];

  // game methods
  surrender: () => void;
};
