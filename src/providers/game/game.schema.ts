import { z } from 'zod';
import { CELL_X, CELL_O, CELL_EMPTY } from './game.conts';
import { AI_EASY, AI_HARD, AI_MEDIUM } from '../app/app.consts';

export const cellValueSchema = z.union([
  z.literal(CELL_X),
  z.literal(CELL_O),
  z.literal(CELL_EMPTY),
]);

export const gameSchema = z.object({
  id: z.string(),
  gamePoints: z.number(),
  datetime: z.string(),

  // winner of the game, null means tie
  winner: z.union([z.literal(CELL_X), z.literal(CELL_O)]).nullable(),
  // game ai level, nullable for possible player vs player game
  aiLevel: z.union([z.literal(AI_EASY), z.literal(AI_MEDIUM), z.literal(AI_HARD)]).nullable(),

  // game field
  cells: z.array(
    z.object({
      id: z.number(),
      value: cellValueSchema,
      turnIdx: z.number(),
      row: z.number(),
      col: z.number(),
    }),
  ),
});

export const gamesSchema = z.array(gameSchema);
