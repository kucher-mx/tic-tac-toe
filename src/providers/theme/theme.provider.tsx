import { useLayoutEffect, useMemo, useState } from 'react';

// types
import { ThemeContextType, ThemesType } from './theme.types';

// context
import { themeContext } from './theme.context';

// consts
import { LIGHT_THEME, DARK_THEME } from './theme.consts';

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const getThemeFromBrowser = () => {
    const datasetTheme = document.documentElement.dataset.theme as ThemesType | undefined;

    const isOsDarkMode = window.matchMedia('(prefers-color-scheme: dark)');
    const osMode = isOsDarkMode.matches ? DARK_THEME : LIGHT_THEME;

    return datasetTheme ?? osMode;
  };

  const [theme, setTheme] = useState<ThemesType>(getThemeFromBrowser);

  // On theme value change set theme in html dataset attributes
  useLayoutEffect(() => {
    if (document.documentElement && document.documentElement.dataset) {
      document.documentElement.dataset.theme = theme;
    }
  }, [theme]);

  const memoThemeContextValue = useMemo<ThemeContextType>(
    () => ({
      theme,
      toggleTheme: () => setTheme(theme => (theme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME)),
    }),
    [theme],
  );
  return <themeContext.Provider value={memoThemeContextValue}>{children}</themeContext.Provider>;
};
