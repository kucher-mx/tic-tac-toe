import classNames from 'classnames';

// context
import { useThemeContext } from '../../providers/theme/theme.context';

// consts
import { LIGHT_THEME } from '../../providers/theme/theme.consts';

// styles
import styles from './theme-toggle.module.css';

export const ThemeToggle = () => {
  const { toggleTheme, theme } = useThemeContext();

  return (
    <button className={classNames(styles['toggle-theme'])} onClick={toggleTheme}>
      {theme === LIGHT_THEME ? 'Світла тема' : 'Темна тема'}
    </button>
  );
};
