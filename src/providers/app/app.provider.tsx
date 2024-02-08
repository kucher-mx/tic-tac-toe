import { useMemo } from 'react';

// context
import { appContext } from './app.context';

// types
import { AppContextType } from './app.types';
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const memoValue = useMemo<AppContextType>(() => ({}), []);
  return <appContext.Provider value={memoValue}>{children}</appContext.Provider>;
};
