import { CELL_EMPTY, GAME_IN_PROGRESS, GAME_TIE } from '../game.conts';
import { CellValueType, GameCellType } from '../game.types';

// const with all winning conditions
const WIN_CONDITIONS = [
  // 3 in row win
  [
    { row: 1, col: 1, idx: 0 },
    { row: 1, col: 2, idx: 1 },
    { row: 1, col: 3, idx: 2 },
  ],
  [
    { row: 2, col: 1, idx: 3 },
    { row: 2, col: 2, idx: 4 },
    { row: 2, col: 3, idx: 5 },
  ],
  [
    { row: 3, col: 1, idx: 6 },
    { row: 3, col: 2, idx: 7 },
    { row: 3, col: 3, idx: 8 },
  ],

  // 3 in collumn win
  [
    { row: 1, col: 1, idx: 0 },
    { row: 2, col: 1, idx: 3 },
    { row: 3, col: 1, idx: 6 },
  ],
  [
    { row: 1, col: 2, idx: 1 },
    { row: 2, col: 2, idx: 4 },
    { row: 3, col: 2, idx: 7 },
  ],
  [
    { row: 1, col: 3, idx: 2 },
    { row: 2, col: 3, idx: 5 },
    { row: 3, col: 3, idx: 8 },
  ],

  // diagonal left-top to right-bottom win
  [
    { row: 1, col: 1, idx: 0 },
    { row: 2, col: 2, idx: 4 },
    { row: 3, col: 3, idx: 8 },
  ],

  // diagonal left-bottom to right-top win
  [
    { row: 1, col: 3, idx: 2 },
    { row: 2, col: 2, idx: 4 },
    { row: 3, col: 1, idx: 6 },
  ],
] as const;

type Args = { cells: GameCellType[] };

type ReturnType = typeof GAME_IN_PROGRESS | typeof GAME_TIE | CellValueType;

/**
 * method to check for someones win
 *
 * @param cells game cells
 */
export const checkForWin = ({ cells }: Args): ReturnType => {
  if (!cells.find(({ value }) => value === CELL_EMPTY)) return GAME_TIE;

  const { winner } = WIN_CONDITIONS.reduce<{ winner: CellValueType | null }>(
    (acc, winCondition) => {
      const [cellOne, cellTwo, cellThree] = winCondition;

      const cellOneValue = cells.at(cellOne.idx)?.value;
      const cellTwoValue = cells.at(cellTwo.idx)?.value;
      const cellThreeValue = cells.at(cellThree.idx)?.value;

      // if some of the cells are empty return current acc
      if (!cellOneValue || !cellTwoValue || !cellThreeValue) return acc;

      if (
        cellOneValue === cellTwoValue &&
        cellTwoValue === cellThreeValue &&
        cellOneValue === cellThreeValue
      ) {
        acc.winner = cellOneValue;
      }

      return acc;
    },
    {
      winner: null,
    },
  );

  return winner ?? GAME_IN_PROGRESS;
};
