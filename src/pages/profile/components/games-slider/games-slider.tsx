import { useCallback, useEffect, useState } from 'react';
import { GameFullType, GamesFullType } from '../../../../providers/game/game.types';
import { useUserContext } from '../../../../providers/user/user.context';
import { loadUserGamesFromFirestore } from '../../../../providers/user/helpers/load-user-games';
import useEmblaCarousel from 'embla-carousel-react';
import type { EmblaOptionsType } from 'embla-carousel';

import styles from './games-slider.module.css';
import { CELL_O, CELL_X } from '../../../../providers/game/game.conts';
import classNames from 'classnames';
import { GameReplayPopup } from '../game-replay-popup/game-replay-popup';

const SLIDER_OPTIONS: Partial<EmblaOptionsType> = {
  align: 'start',
  skipSnaps: false,
};

export const GamesSlider = () => {
  const { user } = useUserContext();

  const [games, setGames] = useState<null | GamesFullType>(null);
  const [isGamesLoading, setIsGamesLoading] = useState(false);

  const [gameToReplay, setGameToReplay] = useState<null | GameFullType>(null);
  const [replayMoveIdx, setReplayMoveIdx] = useState<null | number>(null);

  const startReplay = useCallback(() => {
    setReplayMoveIdx(1);
  }, []);
  const replayNextMove = useCallback(() => {
    setReplayMoveIdx(prev => Math.min(Number(prev) + 1, 9));
  }, []);
  const replayPrevMove = useCallback(() => {
    setReplayMoveIdx(prev => Math.max(Number(prev) - 1, 1));
  }, []);

  const closeReplayPopup = useCallback(() => {
    setGameToReplay(null);
    setReplayMoveIdx(null);
  }, []);

  const [emblaRef, emblaApi] = useEmblaCarousel(SLIDER_OPTIONS);

  useEffect(() => {
    if (!user) return;

    void (async () => {
      try {
        setIsGamesLoading(true);

        const gamesFromFirestore = await loadUserGamesFromFirestore(user.games);

        setGames(gamesFromFirestore);
      } catch (error) {
        console.error('error while loading games', error);
      } finally {
        setIsGamesLoading(false);
      }
    })();
  }, [user?.games?.join(',')]);

  useEffect(() => {
    emblaApi?.reInit();
  }, [games]);

  return (
    <>
      <div className={styles['games-slider-wrapper']}>
        <div ref={emblaRef} className={styles['slider-viewport']}>
          <div className={styles['slider-container']}>
            {games?.map(game => {
              const isWon = game.winner === CELL_O;
              const isLost = game.winner === CELL_X;

              return (
                <div
                  key={game.id}
                  className={classNames(styles['slide'], {
                    [styles['won']]: isWon,
                    [styles['lost']]: isLost,
                  })}
                  onClick={() => setGameToReplay(game)}
                >
                  <span>{isWon ? 'Перемога' : isLost ? 'Програш' : 'Нічия'}</span>{' '}
                  <span>{`${game.gamePoints > 0 ? '+' : game.gamePoints < 0 ? '-' : ''}${
                    game.gamePoints
                  } очок`}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <GameReplayPopup
        handleClose={closeReplayPopup}
        selectedGame={gameToReplay}
        currentMoveIdx={replayMoveIdx}
        startReplay={startReplay}
        nextMove={replayNextMove}
        prevMove={replayPrevMove}
      />
    </>
  );
};
