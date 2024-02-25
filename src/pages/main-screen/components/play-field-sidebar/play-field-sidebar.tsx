import classNames from 'classnames';

// components
import { Icon } from '../../../../components/icon/icon';
import { Timer } from '../../../../components/timer/timer';
import { AiLevelToggler } from '../ai-level-toggler/ai-level-toggler';

// context
import { useGameContext } from '../../../../providers/game/game.context';

// consts
import { GAME_IN_PROGRESS } from '../../../../providers/game/game.conts';

// styles
import styles from './play-field-sidebar.module.css';

export const PlayFieldSidebar = () => {
  const { gameStatus, playerSign, currentMove, currentMoveEndsIn, surrender } = useGameContext();

  return (
    <div className={classNames(styles.playFieldSidebar)}>
      <div className={classNames(styles['turn-timer'])}>
        <Timer deadline={currentMoveEndsIn} showMinutes showSeconds />
      </div>

      <button
        className={classNames(styles.surrender)}
        disabled={gameStatus !== GAME_IN_PROGRESS}
        onClick={surrender}
      >
        <Icon id={'surrender'} />
      </button>

      <div
        className={classNames(styles['current-turn'], {
          [styles['is-opponent-turn']]: currentMove !== playerSign,
        })}
      >
        {currentMove === playerSign ? 'Your turn' : "Opponent's turn"}
      </div>

      <div className={classNames(styles['ai-level-toggler-wrapper'])}>
        <AiLevelToggler />
      </div>
    </div>
  );
};
