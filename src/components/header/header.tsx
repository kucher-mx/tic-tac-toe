import { useState } from 'react';
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
import { ThemeToggler } from '../theme-toggler/theme-toggler';

export const AppSidebar = () => {
  const { user, logout } = useUserContext();
  const { openAuthPopup } = useAppContext();
  const { theme, toggleTheme } = useThemeContext();

  const navigate = useNavigate();

  const isMainPage = useMatch(MAIN_PAGE_ROUTE);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev);
  const handleCloseMobileMenu = () => setIsMobileMenuOpen(false);

  const handleLogout = () => {
    logout();

    if (!isMainPage) navigate(MAIN_PAGE_ROUTE);
  };

  const handleOpenAuthPopup = () => {
    setIsMobileMenuOpen(false);
    openAuthPopup();
  };

  return (
    <div className={classNames(styles['app-header'])}>
      <div className={styles.container}>
        <Link to={'/'} className={classNames(styles['main-link'])}>
          Tic Tac Toe
        </Link>

        <div
          className={classNames(styles['menu-gamburger'], {
            [styles['mobile-active']]: isMobileMenuOpen,
          })}
          onClick={toggleMobileMenu}
        >
          <div />
          <div />
          <div />
        </div>

        {Boolean(user) ? (
          <>
            <Link to={'/profile'} className={styles['menu-item']}>
              Профіль
            </Link>
            <Link to={'/rating?page=1'} className={styles['menu-item']}>
              Рейтинг
            </Link>
            <button
              className={classNames(styles['menu-item'], styles['app-auth-btn'])}
              onClick={handleLogout}
            >
              Вийти
            </button>
          </>
        ) : (
          <>
            <button
              className={classNames(styles['menu-item'], styles['app-auth-btn'])}
              onClick={openAuthPopup}
            >
              Авторизуватися
            </button>
          </>
        )}
        {/* 
        <button
          className={classNames(styles['menu-item'], styles['toggle-theme'])}
          onClick={toggleTheme}
        >
          {theme === LIGHT_THEME ? 'Світла тема' : 'Темна тема'}
        </button> */}
        <ThemeToggler />

        <div
          className={classNames(styles['mobile-menu'], { [styles['is-open']]: isMobileMenuOpen })}
        >
          {Boolean(user) ? (
            <>
              <Link to={'/profile'} className={styles['menu-item']} onClick={handleCloseMobileMenu}>
                Профіль
              </Link>
              <Link to={'/rating'} className={styles['menu-item']} onClick={handleCloseMobileMenu}>
                Рейтинг
              </Link>
              <button
                className={classNames(styles['menu-item'], styles['app-auth-btn'])}
                onClick={handleLogout}
              >
                Вийти
              </button>
            </>
          ) : (
            <>
              <button
                className={classNames(styles['menu-item'], styles['app-auth-btn'])}
                onClick={handleOpenAuthPopup}
              >
                Авторизуватися
              </button>
            </>
          )}

          <button
            className={classNames(styles['menu-item'], styles['toggle-theme'])}
            onClick={toggleTheme}
          >
            {theme === LIGHT_THEME ? 'Світла тема' : 'Темна тема'}
          </button>
        </div>
      </div>
    </div>
  );
};
