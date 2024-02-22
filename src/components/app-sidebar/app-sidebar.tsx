import { Link, useMatch, useNavigate } from 'react-router-dom';
import classNames from 'classnames';

// context
import { useUserContext } from '../../providers/user/user.context';

// components
import { ThemeToggle } from '../theme-toggler/theme-toggle';

// consts
import { MAIN_PAGE_ROUTE, PROFILE_PAGE_ROUTE, RATING_PAGE_ROUTE } from '../../shared/consts/routes';

// styles
import styles from './app-sidebar.module.css';
import { useAppContext } from '../../providers/app/app.context';

export const AppSidebar = () => {
  const { user, logout } = useUserContext();
  const { openAuthPopup } = useAppContext();

  const navigate = useNavigate();

  const isMainPage = useMatch(MAIN_PAGE_ROUTE);
  const isProfilePage = useMatch(PROFILE_PAGE_ROUTE);
  const isRatingPage = useMatch(RATING_PAGE_ROUTE);

  const handleLogout = () => {
    logout();

    if (!isMainPage) navigate(MAIN_PAGE_ROUTE);
  };

  return (
    <div className={classNames(styles['app-sidebar'])}>
      <Link
        to={'/'}
        className={classNames({
          [styles.active]: isMainPage,
        })}
      >
        Головна
      </Link>

      {Boolean(user) ? (
        <>
          <Link
            to={'/profile'}
            className={classNames({
              [styles.active]: isProfilePage,
            })}
          >
            Профіль
          </Link>
          <Link
            to={'/rating'}
            className={classNames({
              [styles.active]: isRatingPage,
            })}
          >
            Рейтинг
          </Link>
          <button className={classNames(styles['app-auth-btn'])} onClick={handleLogout}>
            Вийти
          </button>
        </>
      ) : (
        <button className={classNames(styles['app-auth-btn'])} onClick={openAuthPopup}>
          Авторизуватися
        </button>
      )}

      <ThemeToggle />
    </div>
  );
};
