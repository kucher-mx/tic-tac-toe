import React from 'react';

// consts
import { AI_EASY } from './app.consts';

// types
import { AppContextType } from './app.types';

export const appContext = React.createContext<AppContextType>({
  currentAiLevel: AI_EASY,
  toggleAiLevel: () => {},
});

export const useAppContext = () => {
  const context = React.useContext(appContext);

  if (!context) throw new Error('appContext should be used within AppProvider');

  return context;
};
