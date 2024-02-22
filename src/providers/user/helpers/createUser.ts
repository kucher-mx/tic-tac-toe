import { setDoc, doc } from 'firebase/firestore';

// consts
import { DEFAULT_USER } from '../user.const';

// types
import { UserType } from '../user.types';

// helpers
import { firestore } from '../../../shared/firebase';

export const createUserInFirestore = async (
  userId: string,
  userBody: Partial<Nullable<UserType>>,
) => {
  try {
    const userData: UserType = {
      ...DEFAULT_USER,
      ...userBody,
      nickname: userBody?.nickname || DEFAULT_USER.nickname,
      email: userBody?.email || DEFAULT_USER.email,
      rating: userBody?.rating || DEFAULT_USER.rating,
      id: userId,
    };

    await setDoc(doc(firestore, 'users', userId), userData);

    return { user: userData };
  } catch (error) {
    throw new Error('Failed to create user');
  }
};
