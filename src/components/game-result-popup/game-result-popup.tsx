import classNames from 'classnames';

// context
import { useAppContext } from '../../providers/app/app.context';
import { useUserContext } from '../../providers/user/user.context';

// components
import Modal from '../modal/modal';
import { Plural } from '../plural/plural';

// consts
import { GAME_RESULT_POINTS_MAPPER, GAME_TIE, GAME_WON } from '../../providers/game/game.conts';

// styles
import styles from './game-result-popup.module.css';

export const GameResultPopup = () => {
  const { gameResultData, currentAiLevel, setGameResultData, openAuthPopup } = useAppContext();
  const { user } = useUserContext();

  // TESTING DATA
  // const { setGameResultData, currentAiLevel, openAuthPopup } = useAppContext();
  // const gameResultData = { gameResult: GAME_TIE } as GameResultDataType;

  const { gameResult } = gameResultData ?? {};

  if (!gameResult) return null;

  const handleClose = () => {
    setGameResultData(null);
  };

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
          {user ? (
            <>
              <div className={styles['new-rating']}>
                Ваш новий рейтинг: <b>{user.rating}</b>
              </div>
              <div className={styles['game-points']}>
                Результат гри:{' '}
                <b
                  className={classNames({
                    [styles['green']]: gamePoints > 0,
                    [styles['red']]: gamePoints < 0,
                  })}
                >
                  {gamePoints >= 0 ? '+' : '–'}&#8239;{Math.abs(gamePoints)}
                  &#8239;
                  <Plural count={gamePoints} many="очок" one="очко" other="очок" few="очки" />
                </b>
              </div>
            </>
          ) : (
            <>
              <div className={styles['game-points']}>
                Ви могли б отримати:{' '}
                <b
                  className={classNames({
                    [styles['green']]: gamePoints > 0,
                    [styles['red']]: gamePoints < 0,
                  })}
                >
                  {gamePoints >= 0 ? '+' : '–'}&#8239;{Math.abs(gamePoints)}
                  &#8239;
                  <Plural count={gamePoints} many="очок" one="очко" other="очок" few="очки" />
                </b>
              </div>
              <button className={styles['auth-btn']} onClick={handleOpenAuthPopup}>
                Авторизуйтесь, щоб змагатись з іншими гравцями
              </button>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};
