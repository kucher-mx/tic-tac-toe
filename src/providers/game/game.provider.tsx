import { useCallback, useEffect, useMemo, useState } from 'react';

// consts
import {
  CELLS,
  CELL_EMPTY,
  CELL_O,
  CELL_X,
  GAME_IN_PROGRESS,
  GAME_LOST,
  GAME_NOT_STARTED,
  GAME_RESULT_POINTS_MAPPER,
  GAME_WON,
  INITIAL_GAME_STATE,
} from './game.conts';

// helpers
import { getMoveTimerTime } from './helpers/get-move-timer-time';
import { checkForWin } from './helpers/check-for-win';
import { getAiBestMove } from './helpers/get-best-move';
import { getGameStatus } from './helpers/get-game-status';
import { saveGameDoc } from './helpers/save-game';

// context
import { useAppContext } from '../app/app.context';
import { useToasterContext } from '../toaster/toaster.context';
import { useUserContext } from '../user/user.context';
import { gameContext } from './game.context';

// types
import {
  CellsValueType,
  GameContextType,
  GameCellType,
  GameStateType,
  GameResultType,
} from './game.types';

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const { currentAiLevel, setGameResultData, shouldUseTimer } = useAppContext();
  const { bug } = useToasterContext();
  const { updateUser, user } = useUserContext();

  const [gameCells, setGameCells] = useState<GameCellType[]>(CELLS);
  const [gameState, setGameState] = useState<GameStateType>(INITIAL_GAME_STATE);

  /**
   * effect to perofm an ai move, will run every time currentMove changes (so every move)
   */
  useEffect(() => {
    const doMove = () => {
      if (CELL_O === gameState.currentMove) return;

      const aiMoveId = getAiBestMove({ cells: gameCells, aiLevel: currentAiLevel });

      if (aiMoveId === null) {
        bug('Не вдалось розрахувати відповідь бота');
        console.error('can not calculate ai move', {
          args: { cells: gameCells, aiLevel: currentAiLevel },
        });
        return;
      }

      makeMove(aiMoveId, gameState.currentMove);
    };

    const moveTimeout = setTimeout(() => {
      doMove();
    }, 750);

    return () => clearTimeout(moveTimeout);
  }, [gameState.currentMove]);

  /**
   * method to clear the game field and reset the game state
   */
  const resetGameField = useCallback(() => {
    setGameCells(CELLS);

    setGameState(INITIAL_GAME_STATE);
  }, []);

  /**
   * method to save game
   */
  const onGameEnd = useCallback(
    async ({ gameResult, cells }: { gameResult: GameResultType; cells: GameCellType[] }) => {
      try {
        const gamePoints = GAME_RESULT_POINTS_MAPPER[currentAiLevel][gameResult];

        setGameResultData({
          gameResult,
        });

        resetGameField();

        // update user and save game only if user is logged in
        if (user !== null) {
          const gameId = String(Math.random().toString(36).slice(2));
          const savedGame = await saveGameDoc({
            gameId,
            gameData: cells,
            aiLevel: currentAiLevel,
            gamePoints,
            winner: gameResult === GAME_WON ? CELL_O : gameResult === GAME_LOST ? CELL_X : null,
          });
          const updatedUser = await updateUser({
            rating: Number(user?.rating) + gamePoints,
            games: [...(user?.games ?? []), gameId],
          });

          return { savedGame, updatedUser };
        }
      } catch (error) {
        console.error('save game error', { error });
      }
    },
    [currentAiLevel, resetGameField, setGameResultData, updateUser, user?.games, user?.rating],
  );

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
      const gameStatus = getGameStatus({
        checkingWinnerResult: gameFinishStatus,
      });

      if (gameStatus !== GAME_IN_PROGRESS && gameStatus !== GAME_NOT_STARTED) {
        onGameEnd({ gameResult: gameStatus, cells: updatedCells });

        return;
      }

      setGameState(prev => {
        const currentMove = prev.currentMove === CELL_O ? CELL_X : CELL_O;

        return {
          ...prev,
          currentMove,
          currentMoveEndsIn: getMoveTimerTime(),
          currentMoveIdx: prev.currentMoveIdx + 1,
          gameStatus,
        };
      });
    },
    [gameCells, gameState.currentMoveIdx, onGameEnd],
  );

  /**
   * method to surrender the game
   */
  const surrender = useCallback(() => {
    onGameEnd({ gameResult: GAME_LOST, cells: gameCells });
  }, [onGameEnd, gameCells]);

  const memoValue = useMemo<GameContextType>(() => {
    const isGameStarted = gameCells.some(({ value }) => value !== CELL_EMPTY);

    return {
      // game cells
      cells: gameCells,
      makeMove,

      // game data
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
    gameState.currentMove,
    gameState.currentMoveEndsIn,
    gameState.gameStatus,
    surrender,
    resetGameField,
  ]);

  return <gameContext.Provider value={memoValue}>{children}</gameContext.Provider>;
};
