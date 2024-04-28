import React from 'react';

import styles from './theme-toggler.module.css';
import { useThemeContext } from '../../providers/theme/theme.context';
import { DARK_THEME } from '../../providers/theme/theme.consts';

export const ThemeToggler = () => {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <div className={styles['toggle-wrapper']}>
      <input
        id="themeSwitcher"
        className={styles['toggle']}
        type="checkbox"
        onChange={toggleTheme}
        checked={theme === DARK_THEME}
      />
    </div>
  );
};
