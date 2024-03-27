import { useEffect, useState } from 'react';
import {
  getDocs,
  collection,
  orderBy,
  query,
  limit,
  startAfter,
  getCountFromServer,
  QuerySnapshot,
  DocumentData,
} from 'firebase/firestore';

// types
import { UserType } from '../../../providers/user/user.types';

// consts
import { RATING_ITEMS_PER_PAGE } from '../helpers/rating.consts';

// helpers
import { firestore } from '../../../shared/firebase';

type Args = {
  page: number;
};

type RatingStateType = Record<string, Array<NonNullable<UserType>>>;
type RatingSnapshotsStateType = Record<string, Array<QuerySnapshot<DocumentData, DocumentData>>>;

export const useRating = ({ page }: Args) => {
  const [rating, setRating] = useState<RatingStateType>({});
  const [ratingShaphots, setRatingSnapshots] = useState<RatingSnapshotsStateType>({});
  const [ratingTotalItems, setRatingTotalItems] = useState(0);

  /**
   * effect to load rating
   */
  useEffect(() => {
    (async () => {
      if (rating[page] !== undefined) return;

      // const startAfterItem =

      // console.log({ ratingShaphots, page });

      // const lastSnapshotItem = ratingShaphots[page - 1]?.at(-1);
      // const lastItem = rating[page - 1]?.at(-1);

      // console.log({ lastItem, lastSnapshotItem, rating, ratingShaphots });

      const firebaseQuery = query(
        collection(firestore, 'users'),
        orderBy('rating', 'desc'),
        // limit(RATING_ITEMS_PER_PAGE),
        // startAfter(lastSnapshotItem ?? {}),
      );

      const ratingSnapshots = await getDocs(firebaseQuery);
      const itemsAmount = (await getCountFromServer(collection(firestore, 'users'))).data().count;

      let accPage = 1;
      const itemsByPages = ratingSnapshots.docs
        .map(doc => doc.data())
        .reduce<RatingStateType>((acc, item) => {
          const itemsInCurrentPage = acc[accPage]?.length ?? 0;

          if (acc[accPage] === undefined) {
            acc[accPage] = [];
          }

          if (itemsInCurrentPage < RATING_ITEMS_PER_PAGE) {
            acc[accPage].push(item as NonNullable<UserType>);
          } else {
            acc[accPage + 1] = [item as NonNullable<UserType>];
            accPage += 1;
          }

          return acc;
        }, {});

      setRating(itemsByPages);

      // setRatingSnapshots(prev => ({
      //   ...prev,
      //   [page]: ratingSnapshots.docs,
      // }));
      // setRating(prev => ({
      //   ...prev,
      //   [page]: ratingSnapshots.docs.map(doc => doc.data()),
      // }));

      setRatingTotalItems(itemsAmount);
    })();
  }, [page, rating]);

  return {
    ratingItems: rating[page] ?? [],
    ratingTotalItems,
  };
};
