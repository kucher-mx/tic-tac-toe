import classNames from 'classnames';

// components
import { Icon } from '../icon/icon';
import { Timer } from '../timer/timer';
import { AiLevelToggler } from '../ai-level-toggler/ai-level-toggler';

// context
import { useGameContext } from '../../providers/game/game.context';

// consts
import { GAME_IN_PROGRESS } from '../../providers/game/game.conts';

// styles
import styles from './play-field-sidebar.module.css';

export const PlayFieldSidebar = () => {
  const { gameStatus, playerSign, currentMove, currentMoveEndsIn, surrender } = useGameContext();

  const isGameInProgress = gameStatus === GAME_IN_PROGRESS;

  return (
    <div className={classNames(styles.playFieldSidebar)}>
      <div className={classNames(styles['turn-timer'])}>
        <Timer deadline={currentMoveEndsIn} showMinutes showSeconds />
      </div>
      <button
        className={classNames(styles.surrender)}
        disabled={!isGameInProgress}
        onClick={surrender}
      >
        <Icon id={'surrender'} />
      </button>
      <div
        className={classNames(styles['current-turn'], {
          [styles['red']]: isGameInProgress && currentMove !== playerSign,
          [styles['green']]: isGameInProgress && currentMove === playerSign,
        })}
      >
        {isGameInProgress
          ? currentMove === playerSign
            ? 'Ваш хід'
            : 'Хід опонента'
          : 'Натисніть на будь-яку клітинку, щоб розпочати гру'}
      </div>

      <div className={classNames(styles['ai-level-toggler-wrapper'])}>
        <AiLevelToggler disabled={isGameInProgress} />
      </div>
    </div>
  );
};
