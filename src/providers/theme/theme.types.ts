import { LIGHT_THEME, DARK_THEME } from './theme.consts';

export type ThemesType = typeof LIGHT_THEME | typeof DARK_THEME;

export type ThemeContextType = {
  theme: ThemesType;
  toggleTheme: () => void;
};
