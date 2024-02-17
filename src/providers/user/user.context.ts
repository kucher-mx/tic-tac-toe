import React from 'react';

// types
import { UserContextType } from './user.types';

export const userContext = React.createContext<UserContextType>({
  user: null,
  logout: () => {},
  signInWithGoogle: () => {},
  createUserWithCredentials: () => {},
  signInWithCredentials: () => {},
});

export const useUserContext = () => {
  const context = React.useContext(userContext);

  if (!context) throw new Error('userContext should be used within UserProvider');

  return context;
};
