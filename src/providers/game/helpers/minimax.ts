// types
import { CELL_EMPTY, CELL_O, CELL_X } from '../game.conts';
import { CellValueType, GameCellType } from '../game.types';
import { getMoveScore } from './get-move-score';

// helpers
import { checkForWin } from './check-for-win';

// helpers

type Args = {
  cells: GameCellType[];
  checkingDepth: number;
  isMaximizing: boolean;
};

/**
 * method to check how good a move is, it recursively calls all possible next moves,
 * if bot will move the cell updated before passing cells here
 *
 * @param cells – game field
 * @param checkingDepth – current depth
 * @isMaximizing – boolean value whether we check for bot move (true) or for players turn (false)
 * @returns score of the move into the current cell
 */
export const minimax = ({ cells, checkingDepth, isMaximizing }: Args) => {
  const gameResult = checkForWin({ cells });
  const moveScore = getMoveScore({ gameResult });

  // if game is over return move score
  if (moveScore !== null) return moveScore;

  // check move for bot
  if (isMaximizing) {
    return cells.reduce((acc, currentCell) => {
      const { value, id: currentCellId } = currentCell;

      // check for an empty cell
      if (value !== CELL_EMPTY) return acc;

      // update cell with bot's sign
      const updatedCells: GameCellType[] = cells.map(cell =>
        cell.id === currentCellId ? { ...cell, value: CELL_X } : cell,
      );

      // get score for the move above
      const nextMoveScore = minimax({
        cells: updatedCells,
        isMaximizing: false,
        checkingDepth: checkingDepth + 1,
      });

      // check whether it's better than current best move, stored in acc
      acc = Math.max(acc, nextMoveScore);

      return acc;
    }, -Infinity);
  }

  // check move for player
  return cells.reduce((acc, currentCell) => {
    const { value, id: currentCellId } = currentCell;

    // check for an empty cell
    if (value !== CELL_EMPTY) return acc;

    // update cell with player's sign
    const updatedCells: GameCellType[] = cells.map(cell =>
      cell.id === currentCellId ? { ...cell, value: CELL_O } : cell,
    );

    // get score for the move above
    const nextMoveScore = minimax({
      cells: updatedCells,
      isMaximizing: true,
      checkingDepth: checkingDepth + 1,
    });

    // check whether it's better (for user, but worse for bot, so we use min here) than current best move, stored in acc
    acc = Math.min(acc, nextMoveScore);

    return acc;
  }, Infinity);
};
