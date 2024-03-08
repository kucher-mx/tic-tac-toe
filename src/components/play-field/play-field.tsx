import classNames from 'classnames';

// context
import { useGameContext } from '../../providers/game/game.context';

// components
import { Icon } from '../icon/icon';

// conts
import { CELL_EMPTY, CELL_X, CELL_O, GAME_IN_PROGRESS } from '../../providers/game/game.conts';

// styles
import styles from './play-field.module.css';
import { useEffect, useState } from 'react';

export const PlayField = () => {
  const { cells, makeMove, gameStatus } = useGameContext();

  const [showGameMessage, setShowGameMessage] = useState(false);

  useEffect(() => {
    if (gameStatus === GAME_IN_PROGRESS) return;
    setShowGameMessage(true);
  }, [gameStatus]);

  return (
    <div
      className={classNames(styles.playField, {
        [styles['show-message']]: showGameMessage,
      })}
    >
      {cells.map(({ value, id }) => {
        const isEmpty = value === CELL_EMPTY;

        return (
          <button
            key={id}
            disabled={!isEmpty}
            className={classNames(styles.cell)}
            onClick={() => makeMove(id, CELL_O)}
          >
            {value === CELL_X && (
              <div className={classNames(styles['cell-value'])}>
                <Icon id={'x-icon'} />
              </div>
            )}
            {value === CELL_O && (
              <div className={classNames(styles['cell-value'])}>
                <Icon id={'zero-icon'} />
              </div>
            )}
          </button>
        );
      })}

      <div
        className={classNames(styles['start-game-message'])}
        onClick={() => setShowGameMessage(false)}
      >
        Натисніть на будь-яку клітинку, щоб розпочати гру
      </div>
    </div>
  );
};
