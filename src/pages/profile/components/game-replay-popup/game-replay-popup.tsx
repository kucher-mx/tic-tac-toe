import classNames from 'classnames';
import Modal from '../../../../components/modal/modal';
import { GameFullType } from '../../../../providers/game/game.types';

// styles
import styles from './game-replay-popup.module.css';
import { CELL_O, CELL_X } from '../../../../providers/game/game.conts';
import { Icon } from '../../../../components/icon/icon';

type Props = {
  handleClose: () => void;
  selectedGame: GameFullType | null;
  currentMoveIdx: number | null;
  startReplay: () => void;
  nextMove: () => void;
  prevMove: () => void;
};

export const GameReplayPopup = ({
  handleClose,
  selectedGame,
  currentMoveIdx,
  startReplay,
  nextMove,
  prevMove,
}: Props) => {
  const isOpen = selectedGame !== null;

  const gameMaxMoveIdx = selectedGame?.cells?.reduce((acc, { turnIdx }) => {
    if (acc < turnIdx) return turnIdx;
    return acc;
  }, 0);

  const isReplayStarted = currentMoveIdx !== null;
  const isOnFirstMove = currentMoveIdx === 1;
  const isOnLastMove = currentMoveIdx === gameMaxMoveIdx;

  console.log({ selectedGame, isReplayStarted, currentMoveIdx, gameMaxMoveIdx });

  return (
    <Modal isOpen={isOpen} onClose={handleClose} className={styles['replay-popup']}>
      <div className={styles['game-replay-popup-wrapper']}>
        <div className={styles['header']}>Перегляд гри</div>
        <div className={styles['body']}>
          <button
            className={classNames(styles['move-btn'], styles['prev'])}
            disabled={isOnFirstMove}
            onClick={prevMove}
          >
            <Icon id="arrow-left" />
          </button>

          <div className={styles['game-field']}>
            {selectedGame?.cells?.map(({ value, id, turnIdx }) => {
              const isIgnoreValue = isReplayStarted && turnIdx > currentMoveIdx;

              return (
                <div key={id} className={styles['cell']}>
                  {value === CELL_X && !isIgnoreValue && (
                    <div className={classNames(styles['cell-value'])}>
                      <Icon id={'x-icon'} />
                    </div>
                  )}
                  {value === CELL_O && !isIgnoreValue && (
                    <div className={classNames(styles['cell-value'])}>
                      <Icon id={'zero-icon'} />
                    </div>
                  )}
                </div>
              );
            })}

            <div
              onClick={startReplay}
              className={classNames(styles['start-replay'], {
                [styles['is-replay-started']]: isReplayStarted,
              })}
            >
              <Icon id="replay" />
            </div>
          </div>

          <button
            className={classNames(styles['move-btn'], styles['next'])}
            disabled={isOnLastMove}
            onClick={nextMove}
          >
            <Icon id="arrow-right" />
          </button>
        </div>
      </div>
    </Modal>
  );
};
