import { useEffect, useState } from 'react';
import { getDocs, collection, orderBy, query, getCountFromServer } from 'firebase/firestore';

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

export const useRating = ({ page }: Args) => {
  const [rating, setRating] = useState<RatingStateType>({});
  const [ratingTotalItems, setRatingTotalItems] = useState(0);

  /**
   * effect to load rating
   */
  useEffect(() => {
    (async () => {
      if (rating[page] !== undefined) return;

      // load all rating items TODO: mb add server pagination (requires deep research)
      const firebaseQuery = query(collection(firestore, 'users'), orderBy('rating', 'desc'));

      const ratingSnapshots = await getDocs(firebaseQuery);

      setRating(prev => {
        const docs = ratingSnapshots.docs.map(doc => doc.data());

        return {
          ...prev,
          ...docs.reduce<{ pages: RatingStateType; currentPage: number }>(
            (acc, item) => {
              const { currentPage } = acc;

              const itemsInCurrentPage = acc.pages[currentPage]?.length ?? 0;
              const isPageExists = acc.pages[currentPage] !== undefined;

              // if page does not exists init it
              if (!isPageExists) acc.pages[currentPage] = [];

              if (itemsInCurrentPage < RATING_ITEMS_PER_PAGE) {
                acc.pages[currentPage].push(item as NonNullable<UserType>);
              } else {
                acc.pages[currentPage + 1] = [item as NonNullable<UserType>];
                acc.currentPage += 1;
              }

              return acc;
            },
            { pages: {}, currentPage: 1 },
          ).pages,
        };
      });

      // load total items amount
      const itemsAmount = (await getCountFromServer(collection(firestore, 'users'))).data().count;
      setRatingTotalItems(itemsAmount);
    })();
  }, [page, rating]);

  return {
    ratingItems: rating[page] ?? [],
    ratingTotalItems,
  };
};
