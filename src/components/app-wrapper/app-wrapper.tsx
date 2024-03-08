import { useEffect } from 'react';
import { collection, getDocs, limit, orderBy, query, startAfter } from 'firebase/firestore';

// helpers
import { firestore } from '../../shared/firebase';

// hooks
import { useRestoreUser } from '../../shared/hooks/useRestoreUser';

// components
import { LoadingFullScreen } from '../loaders/loading-full-screen';
import { ToasterMessages } from '../toaster/toaster-popup';
import { AuthPopup } from '../auth-popup/auth-popup';
import { useToasterContext } from '../../providers/toaster/toaster.context';
import { AppSidebar } from '../header/header';

// styles
import styles from '../../shared/styles/reset.module.css';

type Props = { children: React.ReactNode };

export const AppWrapper = ({ children }: Props) => {
  const { isLoading } = useRestoreUser();
  const { bug, success, info, warning } = useToasterContext();

  // rating data query test
  // useEffect(() => {
  //   (async () => {
  //     const ratingRef = collection(firestore, 'users');
  //     const data = await getDocs(query(ratingRef, orderBy('rating', 'desc'), limit(2)));

  //     const nextData = await getDocs(
  //       query(ratingRef, orderBy('rating', 'desc'), limit(2), startAfter(data.docs.at(-1))),
  //     );

  //     console.log({ first: data.docs, next: nextData.docs });
  //   })();
  // }, []);

  return (
    <main className={styles.main}>
      <ToasterMessages />
      <AuthPopup />
      {isLoading ? <LoadingFullScreen /> : null}
      {children}
    </main>
  );
};
