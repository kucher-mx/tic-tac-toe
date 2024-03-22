import { useEffect, useState } from 'react';
import {
  getDoc,
  doc,
  getDocs,
  collection,
  orderBy,
  query,
  limit,
  startAfter,
} from 'firebase/firestore';

// types
import { UserType } from '../../../providers/user/user.types';

// helpers
import { firestore } from '../../../shared/firebase';

type Args = {
  page: number;
};

type RatingStateType = Record<string, NonNullable<UserType>>;

export const useRating = ({ page }: Args) => {
  const [rating, setRating] = useState<RatingStateType>({});

  /**
   * effect to load rating
   */
  useEffect(() => {
    (async () => {
      const firebaseQuery = query(
        collection(firestore, 'users'),
        orderBy('rating', 'desc'),
        limit(20),
        startAfter(page * 20),
      );

      const ratingSnapshots = await getDocs(firebaseQuery);

      setRating(prev => ({
        ...prev,
        [page]: ratingSnapshots.docs.map(doc => doc.data()),
      }));

      console.log({ ratingSnapshots });
    })();
  }, [page]);

  console.log({ rating });

  return {
    rating,
  };
};
