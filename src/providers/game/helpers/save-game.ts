import { setDoc, doc } from 'firebase/firestore';
import { firestore } from '../../../shared/firebase';
import { CellValueType, GameCellType, GameFullType } from '../game.types';
import { AiLevelType } from '../../app/app.types';

export const saveGameDoc = async ({
  gameId,
  aiLevel,
  winner,
  gamePoints,

  gameData,
}: {
  gameId: string;
  gamePoints: number;
  aiLevel: AiLevelType | null;
  winner: CellValueType | null;

  gameData: GameCellType[];
}) => {
  try {
    const gameToSave: GameFullType = {
      id: gameId,
      datetime: new Date().toISOString(),
      aiLevel,
      winner,
      gamePoints,

      cells: gameData,
    };

    await setDoc(doc(firestore, 'games', gameId), gameToSave);

    return { game: gameToSave };
  } catch (error) {
    throw error;
  }
};
