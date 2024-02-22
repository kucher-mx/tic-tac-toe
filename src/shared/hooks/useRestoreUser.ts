import { useEffect, useState } from 'react';
import { useUserContext } from '../../providers/user/user.context';
import { firebaseAuth } from '../firebase';
import { getUserFromFirestore } from '../../providers/user/helpers/getUser';

export const useRestoreUser = () => {
  const { setUserState } = useUserContext();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    firebaseAuth.onAuthStateChanged(user => {
      if (!user) return;

      setIsLoading(true);
      getUserFromFirestore(user.uid)
        .then(({ user }) => {
          setUserState(user);
        })
        .catch(error => {
          console.error('restore user error', { error, userId: user.uid });
        })
        .finally(() => setIsLoading(false));
    });
  }, []);

  return { isLoading };
};
