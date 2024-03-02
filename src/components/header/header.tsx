import { Link, useMatch, useNavigate } from 'react-router-dom';
import classNames from 'classnames';

// context
import { useUserContext } from '../../providers/user/user.context';
import { useThemeContext } from '../../providers/theme/theme.context';
import { useAppContext } from '../../providers/app/app.context';

// consts
import { LIGHT_THEME } from '../../providers/theme/theme.consts';
import { MAIN_PAGE_ROUTE } from '../../shared/consts/routes';

// styles
import styles from './header.module.css';

export const AppSidebar = () => {
  const { user, logout } = useUserContext();
  const { openAuthPopup } = useAppContext();
  const { theme, toggleTheme } = useThemeContext();

  const navigate = useNavigate();

  const isMainPage = useMatch(MAIN_PAGE_ROUTE);

  const handleLogout = () => {
    logout();

    if (!isMainPage) navigate(MAIN_PAGE_ROUTE);
  };

  return (
    <div className={classNames(styles['app-header'])}>
      <div className={styles.container}>
        <Link to={'/'} className={classNames(styles['main-link'])}>
          Tic Tac Toe
        </Link>

        {Boolean(user) ? (
          <>
            <Link to={'/profile'}>Профіль</Link>
            <Link to={'/rating'}>Рейтинг</Link>
            <button className={classNames(styles['app-auth-btn'])} onClick={handleLogout}>
              Вийти
            </button>
          </>
        ) : (
          <>
            <button className={classNames(styles['app-auth-btn'])} onClick={openAuthPopup}>
              Авторизуватися
            </button>
          </>
        )}

        <button className={classNames(styles['toggle-theme'])} onClick={toggleTheme}>
          {theme === LIGHT_THEME ? 'Світла тема' : 'Темна тема'}
        </button>
      </div>
    </div>
  );
};
