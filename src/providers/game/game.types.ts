import {
  CELL_X,
  CELL_O,
  CELL_EMPTY,
  GAME_IN_PROGRESS,
  GAME_LOST,
  GAME_WON,
  GAME_NOT_STARTED,
  GAME_TIE,
} from './game.conts';

export type CellsValueType = typeof CELL_X | typeof CELL_O | typeof CELL_EMPTY;
export type CellValueType = typeof CELL_X | typeof CELL_O;

export type GameStatusType =
  | typeof GAME_IN_PROGRESS
  | typeof GAME_LOST
  | typeof GAME_NOT_STARTED
  | typeof GAME_WON
  | typeof GAME_TIE;

export type GameResultType = typeof GAME_LOST | typeof GAME_WON | typeof GAME_TIE;

export type GameCellType = {
  id: number;
  value: CellsValueType;
  turnIdx: number;
  row: number;
  col: number;
};
export type GameStateType = {
  playerSign: CellValueType;
  currentMove: CellValueType;
  currentMoveEndsIn: number;
  currentMoveIdx: number;
  gameStatus: GameStatusType;
};

export type GameContextType = {
  // game cells
  cells: GameCellType[];
  makeMove: (id: number, value: CellsValueType) => void;

  // game data
  playerSign: GameStateType['playerSign'];
  currentMove: GameStateType['currentMove'];
  currentMoveEndsIn: GameStateType['currentMoveEndsIn'];
  gameStatus: GameStatusType;

  // game methods
  surrender: () => void;
  resetGameField: () => void;
};
