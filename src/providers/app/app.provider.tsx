import { useMemo, useState } from 'react';

// context
import { appContext } from './app.context';

// consts
import { AI_EASY } from './app.consts';

// types
import { AiLevelType, AppContextType } from './app.types';
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [aiLevel, setAiLevel] = useState<AiLevelType>(AI_EASY);
  const [isAuthPopupOpen, setIsAuthPopupOpen] = useState(false);

  const memoValue = useMemo<AppContextType>(
    () => ({
      // ai level
      currentAiLevel: aiLevel,
      toggleAiLevel: (aiLevel: AiLevelType) => setAiLevel(aiLevel),

      // auth popup
      isAuthPopupOpen,
      openAuthPopup: () => setIsAuthPopupOpen(true),
      closeAuthPopup: () => setIsAuthPopupOpen(false),
    }),
    [aiLevel, isAuthPopupOpen],
  );
  return <appContext.Provider value={memoValue}>{children}</appContext.Provider>;
};
