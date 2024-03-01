import { setDoc, doc } from 'firebase/firestore';
import { firestore } from '../../../shared/firebase';
import { GameCellType } from '../game.types';

export const saveGameDoc = async ({
  gameId,
  gameData,
}: {
  gameId: string;
  gameData: GameCellType[];
}) => {
  try {
    const gameToSave = {
      id: gameId,
      ...gameData,
    };

    await setDoc(doc(firestore, 'games', gameId), gameToSave);

    return { game: gameToSave };
  } catch (error) {
    throw error;
  }
};
