import { z } from 'zod';
import { userSchema } from './helpers/user.schema';

export type UserSchemaType = z.infer<typeof userSchema>;

export type UserType = UserSchemaType | null;

export type UserContextType = {
  user: UserType;
  createUserWithCredentials: (email: string, password: string) => void;
  signInWithCredentials: (email: string, password: string) => void;
  signInWithGoogle: () => void;
  logout: () => void;
  updateUser: (user: Partial<UserSchemaType>) => void;
  setUserState: (user: UserType) => void;
};
