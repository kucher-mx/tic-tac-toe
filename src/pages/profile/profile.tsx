import classNames from 'classnames';

// components
import { AppSidebar } from '../../components/app-sidebar/app-sidebar';

// styles
import styles from './profile.module.css';

type Props = {};

export const ProfileScreen = ({}: Props) => {
  return (
    <div className={classNames(styles['profile-page'])}>
      <AppSidebar />
      profile page
    </div>
  );
};
