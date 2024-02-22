import classNames from 'classnames';

// components
import { AppSidebar } from '../../components/app-sidebar/app-sidebar';

// styles
import styles from './rating.module.css';

type Props = {};

export const RatingScreen = ({}: Props) => {
  return (
    <div className={classNames(styles['rating-page'])}>
      <AppSidebar />
      rating page
    </div>
  );
};
