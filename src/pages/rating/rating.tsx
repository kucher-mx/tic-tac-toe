import classNames from 'classnames';

// components
import { AppSidebar } from '../../components/header/header';

// helpers
import { useRating } from './hooks/use-rating';

// styles
import styles from './rating.module.css';

type Props = {};

export const RatingScreen = ({}: Props) => {
  const { rating } = useRating({ page: 1 });
  return (
    <div className={classNames(styles['rating-page'])}>
      <AppSidebar />
      <div className={styles['rating-list']}></div>
      cooming soon...
    </div>
  );
};
