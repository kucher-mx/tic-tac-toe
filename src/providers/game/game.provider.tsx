import { useMemo, useState } from 'react';

// consts
import { CELLS, CELL_O, CELL_X } from './game.conts';

// context
import { gameContext } from './game.context';

// types
import { CellsValueType, GameContextType, GameCellType, GameStateType } from './game.types';
import { getTurnTimerTime } from './helpers/getTurnTimerTime';

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [gameCells, setGameCells] = useState<GameCellType[]>(CELLS);
  const [gameState, setGameState] = useState<GameStateType>({
    playerSign: CELL_O,
    currentTurn: CELL_O,
    currentTurnEndsIn: getTurnTimerTime(),
    currentTurnIdx: 1,
  });

  const memoValue = useMemo<GameContextType>(
    () => ({
      // game cells
      cells: gameCells,
      updateCell: (id: number, value: CellsValueType) => {
        setGameCells(prev =>
          prev.map(cell =>
            cell.id === id ? { ...cell, value, turnIdx: gameState.currentTurnIdx } : cell,
          ),
        );

        setGameState(prev => ({
          ...prev,
          currentTurn: prev.currentTurn === CELL_O ? CELL_X : CELL_O,
          currentTurnEndsIn: getTurnTimerTime(),
          currentTurnIdx: prev.currentTurnIdx++,
        }));
      },

      // game data
      playerSign: gameState.playerSign,
      currentTurn: gameState.currentTurn,
      currentTurnEndsIn: gameState.currentTurnEndsIn,

      // game methods
      surrender: () => {
        setGameCells(CELLS);

        setGameState(prev => ({
          ...prev,
          currentTurn: prev.playerSign,
          currentTurnEndsIn: 0,
        }));
      },
    }),
    [
      gameCells,
      gameState.currentTurn,
      gameState.currentTurnEndsIn,
      gameState.currentTurnIdx,
      gameState.playerSign,
    ],
  );

  console.log({ memoValue });

  return <gameContext.Provider value={memoValue}>{children}</gameContext.Provider>;
};
