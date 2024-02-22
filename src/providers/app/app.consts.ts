export const AI_EASY = 'ai_easy';
export const AI_MEDIUM = 'ai_medium';
export const AI_HARD = 'ai_hard';

export const AI_LEVELS = [AI_EASY, AI_MEDIUM, AI_HARD] as const;
export const AI_LEVELS_NAMES = {
  [AI_EASY]: 'easy',
  [AI_MEDIUM]: 'medium',
  [AI_HARD]: 'hard',
} as const;
