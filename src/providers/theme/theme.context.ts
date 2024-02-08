import React from 'react';

// consts

// types
import { ThemeContextType } from './theme.types';

export const themeContext = React.createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
});

export const useThemeContext = () => {
  const context = React.useContext(themeContext);

  if (!context) throw new Error('themeContext should be used within ThemeProvider');

  return context;
};
