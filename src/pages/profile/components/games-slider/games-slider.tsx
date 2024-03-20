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

  // Start replay (show game 1st move)
  const startReplay = useCallback(() => {
    setReplayMoveIdx(1);
  }, []);

  // Increase replay move
  const replayNextMove = useCallback(() => {
    setReplayMoveIdx(prev => Math.min(Number(prev) + 1, 9));
  }, []);

  // Descrease replay move
  const replayPrevMove = useCallback(() => {
    setReplayMoveIdx(prev => Math.max(Number(prev) - 1, 1));
  }, []);

  // Close popup, reset game and move idx
  const closeReplayPopup = useCallback(() => {
    setGameToReplay(null);
    setReplayMoveIdx(null);
  }, []);

  const [emblaRef, emblaApi] = useEmblaCarousel(SLIDER_OPTIONS);

  /**
   * effect to load games
   */
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
              const { winner, gamePoints } = game;
              const isWon = winner === CELL_O;
              const isLost = winner === CELL_X;

              const pointsWord = Math.abs(gamePoints) === 1 ? 'очко' : 'очок';

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
                  <span>{`${gamePoints > 0 ? '+' : ''}${gamePoints} ${pointsWord}`}</span>
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
