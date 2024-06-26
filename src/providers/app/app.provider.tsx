import { useEffect, useMemo, useState } from 'react';

// context
import { appContext } from './app.context';

// consts
import { AI_EASY } from './app.consts';

// types
import { AiLevelType, AppContextType, GameResultDataType } from './app.types';

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [aiLevel, setAiLevel] = useState<AiLevelType>(AI_EASY);
  const [gameResultData, setGameResultData] = useState<GameResultDataType>(null);
  const [isAuthPopupOpen, setIsAuthPopupOpen] = useState(false);
  const [shouldUseTimer, setShouldUseTimer] = useState(true);

  useEffect(() => {
    const storedUseTimer = localStorage.getItem('shouldUseTimer');

    if (storedUseTimer === 'true') setShouldUseTimer(true);
    if (storedUseTimer === 'false') setShouldUseTimer(false);
  }, []);

  const memoValue = useMemo<AppContextType>(
    () => ({
      // ai level
      currentAiLevel: aiLevel,
      toggleAiLevel: (aiLevel: AiLevelType) => setAiLevel(aiLevel),

      // game result data
      gameResultData,
      setGameResultData: (data: GameResultDataType) => setGameResultData(data),

      shouldUseTimer,
      setShouldUseTimer: (newValue: boolean) => {
        localStorage.setItem('shouldUseTimer', String(newValue));
        setShouldUseTimer(newValue);
      },

      // auth popup
      isAuthPopupOpen,
      openAuthPopup: () => setIsAuthPopupOpen(true),
      closeAuthPopup: () => setIsAuthPopupOpen(false),
    }),
    [aiLevel, gameResultData, isAuthPopupOpen, shouldUseTimer],
  );
  return <appContext.Provider value={memoValue}>{children}</appContext.Provider>;
};
