// types
import { IconSpritesIdsType } from '../../shared/icons/icons.types.js';

// icons
import spriteUrl from '../../shared/icons/sprites.svg';

export const Icon = ({ id }: { id: IconSpritesIdsType }) => {
  return (
    <svg>
      <use xlinkHref={`${spriteUrl}#${id}`} />
    </svg>
  );
};
