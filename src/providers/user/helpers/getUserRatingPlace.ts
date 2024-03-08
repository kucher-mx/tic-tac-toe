import { query, collection, where, orderBy, getDocs } from 'firebase/firestore';

// helpers
import { firestore } from '../../../shared/firebase';
import { getUserFromFirestore } from './getUser';

export const getUserPlaceFromFirestore = async (userId: string) => {
  try {
    const { user } = await getUserFromFirestore(userId);

    if (!user) {
      console.error('user not found', { userId, user });
      return 0;
    }

    const firebaseQuery = query(
      collection(firestore, 'users'),
      orderBy('rating', 'desc'),
      where('rating', '>=', user.rating),
    );

    const querySnapshot = await getDocs(firebaseQuery);

    // TODO: optimize this?? do not load all users, get only placement
    const userPlace = querySnapshot.size;

    return userPlace;
  } catch (error) {
    throw new Error('Failed to get user rating place from firestore');
  }
};
