export type UserType = {
  id: string;
  rating: number;
  nickName: string;
  email: string;
} | null;

export type UserContextType = {
  user: UserType;
  createUserWithCredentials: (email: string, password: string) => void;
  signInWithCredentials: (email: string, password: string) => void;
  signInWithGoogle: () => void;
  logout: () => void;
};
