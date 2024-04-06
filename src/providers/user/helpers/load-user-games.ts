import { query, collection, where, orderBy, getDocs } from 'firebase/firestore';

// helpers
import { firestore } from '../../../shared/firebase';
import { gamesSchema } from '../../game/game.schema';

export const loadUserGamesFromFirestore = async (userGamesIds: string[]) => {
  try {
    const firebaseQuery = query(
      collection(firestore, 'games'),
      orderBy('datetime', 'desc'),
      where('id', 'in', userGamesIds),
    );

    const games = await getDocs(firebaseQuery);

    const parsedGames = gamesSchema.safeParse(games.docs.map(doc => doc.data()));

    if (parsedGames.success) return parsedGames.data;

    return [];
  } catch (error) {
    console.error(error);
    throw new Error('Failed to get user games place from firestore');
  }
};
