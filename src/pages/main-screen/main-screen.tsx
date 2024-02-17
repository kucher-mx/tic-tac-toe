import classNames from 'classnames';

// components
import { PlayField } from './components/play-field/play-field';
import { PlayFieldSidebar } from './components/play-field-sidebar/play-field-sidebar';
import { AuthPopup } from '../../components/auth-popup/auth-popup';
import { AppSidebar } from '../../components/app-sidebar/app-sidebar';

// context
import { useAppContext } from '../../providers/app/app.context';

// styles
import styles from './main-screen.module.css';

export const MainScreen = () => {
  const { isAuthPopupOpen, closeAuthPopup } = useAppContext();

  return (
    <div className={classNames(styles.mainScreen)}>
      <PlayField />
      <PlayFieldSidebar />
      <AppSidebar />

      <AuthPopup isOpen={isAuthPopupOpen} handleClose={closeAuthPopup} />
    </div>
  );
};
