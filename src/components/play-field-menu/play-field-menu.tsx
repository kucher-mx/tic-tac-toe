import classNames from 'classnames';

// components
import { Icon } from '../icon/icon';
import { Timer } from '../timer/timer';
import { AiLevelToggler } from '../ai-level-toggler/ai-level-toggler';

// context
import { useToasterContext } from '../../providers/toaster/toaster.context';
import { useGameContext } from '../../providers/game/game.context';

// consts
import { CELL_EMPTY, GAME_IN_PROGRESS } from '../../providers/game/game.conts';

// styles
import styles from './play-field-menu.module.css';

export const PlayFieldSidebar = () => {
  const { bug } = useToasterContext();
  const { gameStatus, currentMoveEndsIn, surrender, makeMove, cells, currentMove } =
    useGameContext();

  const isGameInProgress = gameStatus === GAME_IN_PROGRESS;

  const handleRandomMove = () => {
    const emptyCells = cells.filter(({ value }) => value === CELL_EMPTY);
    const randomEmptyCellId = emptyCells.at(Math.floor(Math.random() * emptyCells.length))?.id;

    if (randomEmptyCellId !== undefined) {
      makeMove(randomEmptyCellId, currentMove);
    } else {
      bug('Не вдалось розрахувати випадковий хід');
      console.error("can't calc random move", { cells, emptyCells, randomEmptyCellId });
    }
  };

  return (
    <div
      className={classNames(styles['playFieldSidebar'], {
        [styles['in-progress']]: isGameInProgress,
      })}
    >
      <div className={classNames(styles['ai-level-toggler-wrapper'])}>
        <AiLevelToggler disabled={isGameInProgress} />
      </div>

      <div className={classNames(styles['timer'])}>
        <Timer
          deadline={currentMoveEndsIn}
          onEnd={handleRandomMove}
          redTimer={5 * 1000}
          showMinutes
          showSeconds
        />

        <button
          className={classNames(styles['surrender'])}
          disabled={!isGameInProgress}
          onClick={surrender}
        >
          <Icon id={'surrender'} />
        </button>
      </div>
    </div>
  );
};
