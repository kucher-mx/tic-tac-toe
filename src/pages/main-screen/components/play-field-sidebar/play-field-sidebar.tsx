import classNames from 'classnames';

// components
import { Icon } from '../../../../components/icon/icon';
import { Timer } from '../../../../components/timer/timer';
import { AiLevelToggler } from '../ai-level-toggler/ai-level-toggler';

// context
import { useGameContext } from '../../../../providers/game/game.context';

// styles
import styles from './play-field-sidebar.module.css';

export const PlayFieldSidebar = () => {
  const { playerSign, currentTurn, currentTurnEndsIn, surrender } = useGameContext();

  return (
    <div className={classNames(styles.playFieldSidebar)}>
      <div className={classNames(styles['turn-timer'])}>
        <Timer deadline={currentTurnEndsIn} showMinutes showSeconds />
      </div>

      <button className={classNames(styles.surrender)} onClick={surrender}>
        <Icon id={'surrender'} />
      </button>

      <div
        className={classNames(styles['current-turn'], {
          [styles['is-opponent-turn']]: currentTurn !== playerSign,
        })}
      >
        {currentTurn === playerSign ? 'Your turn' : "Opponent's turn"}
      </div>

      <div className={classNames(styles['ai-level-toggler-wrapper'])}>
        <AiLevelToggler />
      </div>
    </div>
  );
};
