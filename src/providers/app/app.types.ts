// consts
import { AI_EASY, AI_HARD, AI_MEDIUM } from './app.consts';

export type AiLevelType = typeof AI_EASY | typeof AI_MEDIUM | typeof AI_HARD;

export type AppContextType = {
  // ai level
  currentAiLevel: AiLevelType;
  toggleAiLevel: (aiLevel: AiLevelType) => void;

  // auth popup
  isAuthPopupOpen: boolean;
  openAuthPopup: () => void;
  closeAuthPopup: () => void;
};
