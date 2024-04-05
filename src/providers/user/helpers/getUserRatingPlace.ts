import {
  query,
  collection,
  where,
  orderBy,
  count,
  getAggregateFromServer,
} from 'firebase/firestore';

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

    const querySnapshot = await getAggregateFromServer(firebaseQuery, {
      itemsCount: count(),
    });

    const userPlace = querySnapshot.data().itemsCount;

    return userPlace;
  } catch (error) {
    throw new Error('Failed to get user rating place from firestore');
  }
};
