import { Outlet } from 'react-router';

// hooks
import { useRestoreUser } from '../../shared/hooks/useRestoreUser';

// components
import { LoadingFullScreen } from '../loaders/loading-full-screen';
import { ToasterMessages } from '../toaster/toaster-popup';
import { AuthPopup } from '../auth-popup/auth-popup';
import { AppSidebar } from '../header/header';

// styles
import styles from '../../shared/styles/reset.module.css';

export const AppWrapper = () => {
  const { isLoading } = useRestoreUser();

  return (
    <main className={styles.main}>
      <AppSidebar />
      <ToasterMessages />
      <AuthPopup />
      {isLoading ? <LoadingFullScreen /> : null}

      <Outlet />
    </main>
  );
};
