// consts
import { CELL_O, GAME_IN_PROGRESS, GAME_TIE } from '../game.conts';

// types
import { CellValueType } from '../game.types';

// helpers
import { checkForWin } from './check-for-win';

type Args = {
  gameResult: ReturnType<typeof checkForWin>;
};

export const getMoveScore = ({ gameResult }: Args) => {
  // if game finished with tie return 0 to that move
  if (gameResult === GAME_TIE) return 0;

  // if game is not finished return null to that move
  if (gameResult === GAME_IN_PROGRESS) return null;

  // if player won return -1
  if (gameResult === CELL_O) return -1;

  // if minimax won return 1
  return 1;
};
