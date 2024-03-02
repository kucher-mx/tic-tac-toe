// types
import { GameStatusType } from '../game.types';

// helopers
import { checkForWin } from './check-for-win';

// consts
import { CELL_O, CELL_X, GAME_IN_PROGRESS, GAME_LOST, GAME_TIE, GAME_WON } from '../game.conts';

type Args = {
  checkingWinnerResult: ReturnType<typeof checkForWin>;
};

/**
 * method to get game status based on checkiing winner result
 */
export const getGameStatus = ({ checkingWinnerResult }: Args): GameStatusType => {
  // if tie return tie
  if (checkingWinnerResult === GAME_TIE) return GAME_TIE;

  // if someone won check whether winner is player if yes return game won othervise lost
  if (checkingWinnerResult === CELL_X || checkingWinnerResult === CELL_O) {
    return checkingWinnerResult === CELL_O ? GAME_WON : GAME_LOST;
  }

  // if all conds failed return game in progress status
  return GAME_IN_PROGRESS;
};
