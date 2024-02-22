import { doc, updateDoc } from 'firebase/firestore';

// types
import { UserSchemaType } from '../user.types';

// helpers
import { firestore } from '../../../shared/firebase';

export const updateUserInFirestore = async (userId: string, userData: UserSchemaType) => {
  try {
    await updateDoc(doc(firestore, 'users', userId), userData);

    return { user: userData };
  } catch (error) {
    throw new Error('Failed to update user');
  }
};
