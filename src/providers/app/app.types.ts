// types
import { GameResultType } from '../game/game.types';

// consts
import { AI_EASY, AI_HARD, AI_MEDIUM } from './app.consts';

export type AiLevelType = typeof AI_EASY | typeof AI_MEDIUM | typeof AI_HARD;

export type GameResultDataType = {
  gameResult: GameResultType;
} | null;

export type AppContextType = {
  // ai level
  currentAiLevel: AiLevelType;
  toggleAiLevel: (aiLevel: AiLevelType) => void;

  // game result data
  gameResultData: GameResultDataType;
  setGameResultData: (data: GameResultDataType) => void;

  // auth popup
  isAuthPopupOpen: boolean;
  openAuthPopup: () => void;
  closeAuthPopup: () => void;
};
