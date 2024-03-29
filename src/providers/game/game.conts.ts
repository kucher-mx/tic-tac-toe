// consts
import { AI_EASY, AI_MEDIUM, AI_HARD } from '../app/app.consts';

// types
import { GameCellType, GameStateType } from './game.types';

const GAME_CELLS = 9;

export const CELL_X = 'X';
export const CELL_O = 'O';
export const CELL_EMPTY = '';

export const CELLS: GameCellType[] = Array.from({ length: GAME_CELLS }, (_, idx) => ({
  id: idx,
  value: CELL_EMPTY,
  turnIdx: -1,
  row: Math.ceil((idx + 1) / 3),
  col: (idx + 1) % 3 === 0 ? 3 : (idx + 1) % 3,
}));

// Game status
export const GAME_NOT_STARTED = 'not_started';
export const GAME_IN_PROGRESS = 'in_progress';
export const GAME_WON = 'won';
export const GAME_LOST = 'lost';
export const GAME_TIE = 'tie';

export const INITIAL_GAME_STATE: GameStateType = {
  currentMove: CELL_O,
  currentMoveEndsIn: 0,
  currentMoveIdx: 1,
  gameStatus: GAME_NOT_STARTED,
};

export const AI_LEVELS_EFFICIENT_MOVE_PERSENTAGES = {
  [AI_EASY]: 0.33,
  [AI_MEDIUM]: 0.66,
  [AI_HARD]: 1,
} as const;

export const GAME_RESULT_POINTS_MAPPER = {
  [AI_EASY]: {
    [GAME_WON]: 1,
    [GAME_LOST]: -1,
    [GAME_TIE]: 0,
  },
  [AI_MEDIUM]: {
    [GAME_WON]: 2,
    [GAME_LOST]: -1,
    [GAME_TIE]: 0,
  },
  [AI_HARD]: {
    [GAME_WON]: 5,
    [GAME_LOST]: -1,
    [GAME_TIE]: 0,
  },
} as const;
