import classNames from 'classnames';

// components
import { PlayField } from '../../components/play-field/play-field';
import { PlayFieldSidebar } from '../../components/play-field-menu/play-field-menu';
import { AppSidebar } from '../../components/header/header';
import { GameResultPopup } from '../../components/game-result-popup/game-result-popup';

// styles
import styles from './main-screen.module.css';

export const MainScreen = () => {
  return (
    <div className={classNames(styles.mainScreen)}>
      <div className={styles['content']}>
        <div className={styles['game-menu']}>
          <PlayFieldSidebar />
        </div>

        <div className={styles['game-field']}>
          <PlayField />
        </div>
      </div>

      <AppSidebar />
      <GameResultPopup />
    </div>
  );
};
