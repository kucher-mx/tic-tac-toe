import classNames from 'classnames';

// components
import Modal from '../modal/modal';

// consts
import {
  GAME_LOST,
  GAME_RESULT_POINTS_MAPPER,
  GAME_TIE,
  GAME_WON,
} from '../../providers/game/game.conts';

// styles
import styles from './game-result-popup.module.css';
import { useAppContext } from '../../providers/app/app.context';
import { GameResultDataType } from '../../providers/app/app.types';
import { useUserContext } from '../../providers/user/user.context';

export const GameResultPopup = () => {
  const { gameResultData, currentAiLevel, setGameResultData, openAuthPopup } = useAppContext();
  // const { setGameResultData, currentAiLevel, openAuthPopup } = useAppContext();
  const { user } = useUserContext();
  // const gameResultData = { gameResult: GAME_TIE } as GameResultDataType;

  const { gameResult } = gameResultData ?? {};

  if (!gameResult) return null;

  const handleClose = () => setGameResultData(null);
  const handleOpenAuthPopup = () => {
    handleClose();
    openAuthPopup();
  };

  const popupTitle =
    gameResult === GAME_TIE
      ? 'Нічия 🤯'
      : gameResult === GAME_WON
      ? 'Ви перемогли 🥳'
      : 'Ви програли 🥱';

  const gamePoints = GAME_RESULT_POINTS_MAPPER[currentAiLevel][gameResult];

  return (
    <Modal
      isOpen={Boolean(gameResultData)}
      onClose={handleClose}
      className={styles['game-result-popup']}
    >
      <div className={classNames(styles['game-result-body'])}>
        <div className={classNames(styles['header'])}>
          <div className={classNames(styles['title'])}>{popupTitle}</div>
        </div>

        <div className={styles['content']}>
          {false ? (
            <>
              <div className={styles['new-rating']}>
                Ваш новий рейтинг: <b>{user?.rating ?? 0 + gamePoints}</b>
              </div>
            </>
          ) : (
            <>
              <div className={styles['game-points']}>
                Ви могли б отримати{' '}
                <b>
                  {gamePoints > 0 ? '+' : '-'} {gamePoints}
                </b>
              </div>
              <button className={styles['auth-btn']} onClick={handleOpenAuthPopup}>
                Авторизуйтесь щоб змагатись з іншими гравцями
              </button>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};
