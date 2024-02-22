import { getDoc, doc } from 'firebase/firestore';

// helpers
import { firestore } from '../../../shared/firebase';
import { userSchema } from './user.schema';

export const getUserFromFirestore = async (userId: string) => {
  try {
    const user = await getDoc(doc(firestore, 'users', userId));

    const isUserExists = user.exists();

    if (isUserExists) {
      const parsedUser = userSchema.parse(user.data());

      return { user: parsedUser };
    }

    return { user: null };
  } catch (error) {
    throw new Error('Failed to get user from firestore');
  }
};
