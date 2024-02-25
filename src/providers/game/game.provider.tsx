import { useCallback, useEffect, useMemo, useState } from 'react';

// consts
import { CELLS, CELL_EMPTY, CELL_O, CELL_X, INITIAL_GAME_STATE } from './game.conts';

// helpers
import { getMoveTimerTime } from './helpers/get-move-timer-time';
import { checkForWin } from './helpers/check-for-win';
import { getAiBestMove } from './helpers/get-best-move';

// context
import { gameContext } from './game.context';

// types
import { CellsValueType, GameContextType, GameCellType, GameStateType } from './game.types';
import { getGameStatus } from './helpers/get-game-status';

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [gameCells, setGameCells] = useState<GameCellType[]>(CELLS);
  const [gameState, setGameState] = useState<GameStateType>(INITIAL_GAME_STATE);

  /**
   * effect to perofm an ai move, will run every time currentMove changes (so every move)
   */
  useEffect(() => {
    const moveTimeout = setTimeout(() => {
      if (gameState.playerSign === gameState.currentMove) return;

      const aiMoveId = getAiBestMove({ cells: gameCells });

      if (!aiMoveId) return;

      makeMove(aiMoveId, gameState.currentMove);
    }, 0);

    return () => clearTimeout(moveTimeout);
  }, [gameState.currentMove]);

  /**
   * method to perform a move
   */
  const makeMove = useCallback(
    (id: number, value: CellsValueType) => {
      const updatedCells = gameCells.map(cell =>
        cell.id === id ? { ...cell, value, turnIdx: gameState.currentMoveIdx } : cell,
      );

      setGameCells(updatedCells);

      const gameFinishStatus = checkForWin({ cells: updatedCells });

      // TODO: add save game and update user on game end

      setGameState(prev => {
        const currentMove = prev.currentMove === CELL_O ? CELL_X : CELL_O;
        const gameStatus = getGameStatus({
          checkingWinnerResult: gameFinishStatus,
          playerSign: prev.playerSign,
        });

        return {
          ...prev,
          currentMove,
          currentMoveEndsIn: getMoveTimerTime(),
          currentMoveIdx: prev.currentMoveIdx++,
          gameStatus,
        };
      });
    },
    [gameCells, gameState.currentMoveIdx],
  );

  /**
   * method to clear the game field and reset the game state
   */
  const resetGameField = useCallback(() => {
    setGameCells(CELLS);

    setGameState(prev => ({
      ...prev,
      currentMove: prev.playerSign,
      currentMoveEndsIn: 0,
    }));
  }, []);

  /**
   * method to surrender the game
   */
  const surrender = useCallback(() => {
    // TODO: add rating update and game saving

    resetGameField();
  }, [resetGameField]);

  const memoValue = useMemo<GameContextType>(() => {
    const isGameStarted = gameCells.some(({ value }) => value !== CELL_EMPTY);

    return {
      // game cells
      cells: gameCells,
      makeMove,

      // game data
      playerSign: gameState.playerSign,
      currentMove: gameState.currentMove,
      currentMoveEndsIn: isGameStarted ? gameState.currentMoveEndsIn : 0,
      gameStatus: gameState.gameStatus,

      // game methods
      surrender,
      resetGameField,
    };
  }, [
    gameCells,
    makeMove,
    gameState.playerSign,
    gameState.currentMove,
    gameState.currentMoveEndsIn,
    gameState.gameStatus,
    surrender,
    resetGameField,
  ]);

  return <gameContext.Provider value={memoValue}>{children}</gameContext.Provider>;
};
