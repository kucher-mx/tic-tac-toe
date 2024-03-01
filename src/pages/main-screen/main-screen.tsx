import classNames from 'classnames';

// components
import { PlayField } from '../../components/play-field/play-field';
import { PlayFieldSidebar } from '../../components/play-field-sidebar/play-field-sidebar';
import { AppSidebar } from '../../components/app-sidebar/app-sidebar';
import { GameResultPopup } from '../../components/game-result-popup/game-result-popup';

// styles
import styles from './main-screen.module.css';

export const MainScreen = () => {
  return (
    <div className={classNames(styles.mainScreen)}>
      <PlayField />
      <PlayFieldSidebar />
      <AppSidebar />
      <GameResultPopup />
    </div>
  );
};
