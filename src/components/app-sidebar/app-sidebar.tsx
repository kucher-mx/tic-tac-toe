// styles
import classNames from 'classnames';
import styles from './app-sidebar.module.css';

export const AppSidebar = () => {
  return (
    <div className={classNames(styles['app-sidebar'])}>
      <button className={classNames(styles['app-auth-btn'])}>Authorize</button>
    </div>
  );
};
