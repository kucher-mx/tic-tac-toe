import * as IconNames from '../../shared/icons/names.js';

// icons
import spriteUrl from '../../shared/icons/sprite.svg';

const avaliableIconsIds: typeof IconNames = IconNames;

const Icon = ({ id }: { id: keyof typeof avaliableIconsIds }) => {
  return (
    <svg>
      <use xlinkHref={`${spriteUrl}#${id}`} />
    </svg>
  );
};

export { avaliableIconsIds, Icon };
