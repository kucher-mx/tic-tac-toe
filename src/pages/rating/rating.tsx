import classNames from 'classnames';
import { useLocation, useNavigate } from 'react-router';

// components
import { Icon } from '../../components/icon/icon';
import { Plural } from '../../components/plural/plural';

// helpers
import { useRating } from './hooks/use-rating';

// consts
import { RATING_ITEMS_PER_PAGE } from './helpers/rating.consts';

// styles
import styles from './rating.module.css';

export const RatingScreen = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const page = Number(new URLSearchParams(search).get('page')) ?? 1;

  const { ratingItems, ratingTotalItems } = useRating({ page });

  const totalPages = Math.ceil(ratingTotalItems / RATING_ITEMS_PER_PAGE);

  return (
    <div className={classNames(styles['rating-page'])}>
      <div className={styles['container']}>
        <div className={styles['rating-list']}>
          {ratingItems.map(({ id, nickname, rating: userRating }, idx) => {
            const userIdx = idx + 1 + (page - 1) * RATING_ITEMS_PER_PAGE;

            return (
              <div key={id} className={styles['rating-item']}>
                <div className={styles['user-place']}>{userIdx}</div>
                <div className={styles['user-name']}>{nickname}</div>
                <div className={styles['user-rating']}>
                  {userRating}&#8239;
                  <Plural count={userRating} many="очок" one="очко" other="очок" few="очки" />
                </div>
              </div>
            );
          })}
        </div>

        <div className={styles['pagination']}>
          <button
            disabled={page === 1}
            onClick={() => {
              navigate(`/rating?page=${page - 1}`);
            }}
          >
            <Icon id="arrow-left" />
          </button>

          <div className={styles['current-page']}>
            {page} / {totalPages}
          </div>

          <button
            disabled={page === totalPages}
            onClick={() => {
              navigate(`/rating?page=${page + 1}`);
            }}
          >
            <Icon id="arrow-right" />
          </button>
        </div>
      </div>
    </div>
  );
};
