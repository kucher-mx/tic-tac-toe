import React from 'react';

// consts
import { AI_EASY } from './app.consts';

// types
import { AppContextType } from './app.types';

export const appContext = React.createContext<AppContextType>({
  // ai level
  currentAiLevel: AI_EASY,
  toggleAiLevel: () => {},

  // game result data
  gameResultData: null,
  setGameResultData: () => {},

  shouldUseTimer: true,
  setShouldUseTimer: () => {},

  // auth popup
  isAuthPopupOpen: false,
  openAuthPopup: () => {},
  closeAuthPopup: () => {},
});

export const useAppContext = () => {
  const context = React.useContext(appContext);

  if (!context) throw new Error('appContext should be used within AppProvider');

  return context;
};
