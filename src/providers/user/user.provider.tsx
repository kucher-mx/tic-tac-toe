import React, { useCallback, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { doc, setDoc } from 'firebase/firestore';
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

// types
import { UserContextType, UserType } from './user.types';

// context
import { userContext } from './user.context';
import { firebaseAuth, firestore } from '../../shared/firebase';

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType>(null);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const signInWithGoogle = useCallback(async () => {
    const provider = new GoogleAuthProvider();

    try {
      const authResult = await signInWithPopup(firebaseAuth, provider);
      const userCredential = GoogleAuthProvider.credentialFromResult(authResult);
      console.log('auth by google success', { userCredential, authResult });

      if (!userCredential) throw new Error('auth by google credentials are empty');

      try {
        await setDoc(doc(firestore, 'users', authResult.user.uid), {
          id: authResult.user.uid,
          rating: 100,
          name: authResult.user.displayName ?? '',
        });
      } catch (writingToDbError) {
        console.error('createUserRecord error', { writingToDbError });
      }
    } catch (error) {
      console.error('auth by google error', {
        error,
        // credential: GoogleAuthProvider.credentialFromError(error),
      });
    }
  }, []);

  const createUserWithCredentials = useCallback(async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
      console.log('createUserWithEmailAndPassword success', { userCredential });

      try {
        await setDoc(
          doc(firestore, 'users', userCredential.user.uid),
          {
            id: userCredential.user.uid,
            rating: 10,
            name: userCredential.user.displayName ?? '',
          },
          { merge: true },
        );
      } catch (writingToDbError) {
        console.error('createUserRecord error', { writingToDbError });
      }
    } catch (error) {
      console.error('createUserWithEmailAndPassword error', { error });
    }
  }, []);

  const signInWithCredentials = useCallback(async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
      console.log('signInWithEmailAndPassword success', { userCredential });

      try {
        await setDoc(doc(firestore, 'users', userCredential.user.uid), {
          id: userCredential.user.uid,
          rating: 0,
          name: userCredential.user.displayName ?? '',
        });
      } catch (writingToDbError) {
        console.error('createUserRecord error', { writingToDbError });
      }
    } catch (error) {
      console.error('signInWithEmailAndPassword error', { error });
    }
  }, []);

  const memoValue = useMemo<UserContextType>(
    () => ({
      user,
      logout,
      signInWithGoogle,
      signInWithCredentials,
      createUserWithCredentials,
    }),
    [createUserWithCredentials, logout, signInWithCredentials, signInWithGoogle, user],
  );

  return <userContext.Provider value={memoValue}>{children}</userContext.Provider>;
};
