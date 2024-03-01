// types
import { CellValueType, GameCellType } from '../game.types';

// consts
import { AI_LEVELS_EFFICIENT_MOVE_PERSENTAGES, CELL_EMPTY, CELL_X } from '../game.conts';

// helpers
import { minimax } from './minimax';
import { AiLevelType } from '../../app/app.types';

type Args = {
  cells: GameCellType[];
  aiLevel: AiLevelType;
};

/**
 * method to get bot's move
 * as we have different levels of bot difficulty
 *  – for hard lvl bot it will use most efficient move
 *  – for medium lvl bot it will take efficient move in 66% (every 2nd)
 *  – for easy lvl bot it will take efficient move in 33% (every 3rd)
 *
 * @param cells – current board after player's move
 * @param aiLevel – selected bot level
 *
 * @returns id of the cell where bot will move
 */
export const getAiBestMove = ({ cells, aiLevel }: Args) => {
  const shoudlTakeMostEfficientMove =
    Math.random() <= AI_LEVELS_EFFICIENT_MOVE_PERSENTAGES[aiLevel];

  if (!shoudlTakeMostEfficientMove) {
    const emptyCells = cells.filter(({ value }) => value === CELL_EMPTY);
    const randomEmptyCellId = emptyCells.at(Math.floor(Math.random() * emptyCells.length))?.id;

    return randomEmptyCellId ?? null;
  }

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
