import classNames from 'classnames';

// context
import { useGameContext } from '../../../../providers/game/game.context';

// components
import { Icon, avaliableIconsIds } from '../../../../components/icon/icon';

// conts
import { CELL_EMPTY, CELL_X, CELL_O } from '../../../../providers/game/game.conts';

// styles
import styles from './play-field.module.css';

export const PlayField = () => {
  const { cells, updateCell, currentTurn } = useGameContext();
  return (
    <div className={classNames(styles.playField)}>
      {cells.map(({ value, id }) => {
        const isEmpty = value === CELL_EMPTY;

        return (
          <button
            key={id}
            disabled={!isEmpty}
            className={classNames(styles.cell)}
            onClick={() => updateCell(id, currentTurn === CELL_X ? CELL_O : CELL_X)}
          >
            {value === CELL_X && (
              <div className={classNames(styles['cell-value'])}>
                <Icon id={avaliableIconsIds.X_ICON} />
              </div>
            )}
            {value === CELL_O && (
              <div className={classNames(styles['cell-value'])}>
                <Icon id={avaliableIconsIds.O_ICON} />
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
};
