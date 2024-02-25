// types
import { CellValueType, GameCellType } from '../game.types';

// consts
import { CELL_EMPTY, CELL_X } from '../game.conts';

// helpers
import { minimax } from './minimax';

type Args = {
  cells: GameCellType[];
};

export const getAiBestMove = ({ cells }: Args) => {
  const { moveCellIdx } = cells.reduce<{
    bestMoveScore: number;
    moveCellIdx: number | null;
  }>(
    (acc, cell) => {
      const { value, id: currentCellId } = cell;

      // check for an empty cell
      if (value !== CELL_EMPTY) return acc;

      const updatedCells: GameCellType[] = cells.map(cell =>
        cell.id === currentCellId ? { ...cell, value: CELL_X } : cell,
      );

      const moveScore = minimax({
        cells: updatedCells,
        isMaximizing: false,
        checkingDepth: 0,
      });

      if (moveScore >= acc.bestMoveScore) {
        acc.bestMoveScore = moveScore;
        acc.moveCellIdx = currentCellId;
      }

      return acc;
    },
    {
      bestMoveScore: -Infinity,
      moveCellIdx: null,
    },
  );

  return moveCellIdx;
};
