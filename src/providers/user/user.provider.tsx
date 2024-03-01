import React, { useCallback, useMemo, useState } from 'react';
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth';

// types
import { UserContextType, UserSchemaType, UserType } from './user.types';

// helpers
import { firebaseAuth } from '../../shared/firebase';
import { getUserFromFirestore } from './helpers/getUser';
import { createUserInFirestore } from './helpers/createUser';
import { updateUserInFirestore } from './helpers/updateUser';

// context
import { userContext } from './user.context';

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType>(null);

  const logout = useCallback(() => {
    try {
      firebaseAuth.signOut();
      setUser(null);
    } catch (error) {
      console.error('sign out error', {
        error,
      });
    }
  }, []);

  // ------------------- AUTHORIZATION METHODS
  const signInWithGoogle = useCallback(async () => {
    const provider = new GoogleAuthProvider();

    try {
      await setPersistence(firebaseAuth, browserLocalPersistence);

      const authResult = await signInWithPopup(firebaseAuth, provider);
      const userCredential = GoogleAuthProvider.credentialFromResult(authResult);

      if (!userCredential) throw new Error('auth by google credentials are empty');

      const userId = authResult.user.uid;

      const { user } = await getUserFromFirestore(userId);

      if (!user) {
        const { user } = await createUserInFirestore(userId, {
          nickname: authResult.user.displayName,
          email: authResult.user.email,
          rating: 0,
        });

        console.log('created user after google login', { user });
        setUser(user);
        return { user };
      } else {
        console.log('signed in user after google login, user exists', { user });
        setUser(user);
        return { user };
      }
    } catch (error) {
      console.error('auth by google error', {
        error,
      });
    }
  }, []);

  const createUserWithCredentials = useCallback(async (email: string, password: string) => {
    try {
      await setPersistence(firebaseAuth, browserLocalPersistence);

      const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);

      console.log('create user by credentials success', { userCredential });

      const { user } = await createUserInFirestore(userCredential.user.uid, {
        nickname: userCredential.user.displayName,
        email: '',
        rating: 0,
      });

      setUser(user);
      return { user };
    } catch (error) {
      console.error('create user by credentials error', { error });
    }
  }, []);

  const signInWithCredentials = useCallback(async (email: string, password: string) => {
    try {
      await setPersistence(firebaseAuth, browserLocalPersistence);

      const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);

      console.log('log in user by credentials success', { userCredential });

      const { user } = await getUserFromFirestore(userCredential.user.uid);

      setUser(user);
      return { user };
    } catch (error) {
      console.error('log in user by credentials error', { error });
    }
  }, []);

  // ------------------- OTHER USER METHODS

  const updateUser = useCallback(
    async (userData: Partial<UserSchemaType>) => {
      try {
        if (!user) return;

        const userId = user.id;
        const { user: updatedUser } = await updateUserInFirestore(userId, { ...user, ...userData });

        setUser(updatedUser);

        return { user: updatedUser };
      } catch (error) {
        console.error('update user error', { error });
      }
    },
    [user],
  );

  const memoValue = useMemo<UserContextType>(
    () => ({
      user,
      logout,
      signInWithGoogle,
      signInWithCredentials,
      createUserWithCredentials,
      updateUser,
      setUserState: (user: UserType) => setUser(user),
    }),
    [createUserWithCredentials, logout, signInWithCredentials, signInWithGoogle, updateUser, user],
  );

  return <userContext.Provider value={memoValue}>{children}</userContext.Provider>;
};
