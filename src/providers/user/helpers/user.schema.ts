import { z } from 'zod';

export const userSchema = z.object({
  id: z.string(),
  nickname: z.string(),
  email: z.string(),
  rating: z.number(),
  games: z.array(z.string()),
});
