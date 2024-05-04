import classNames from 'classnames';
import { Loader } from '../loader/loader';

import styles from './loading-full-screen.module.css';

export const LoadingFullScreen = ({ isActive }: { isActive: boolean }) => {
  return (
    <div className={classNames(styles['wrapper'], { [styles['active']]: isActive })}>
      <Loader />
    </div>
  );
};
