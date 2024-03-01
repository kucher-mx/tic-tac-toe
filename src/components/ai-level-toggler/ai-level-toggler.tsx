import classNames from 'classnames';

// context
import { useAppContext } from '../../providers/app/app.context';

// consts
import { AI_LEVELS, AI_LEVELS_NAMES } from '../../providers/app/app.consts';

// styles
import styles from './ai-level-toggler.module.css';

type Props = {
  disabled?: boolean;
};

export const AiLevelToggler = ({ disabled }: Props) => {
  const { currentAiLevel, toggleAiLevel } = useAppContext();

  return (
    <div className={classNames(styles['ai-level-toggler'])}>
      {AI_LEVELS.map(aiLevel => {
        const isActive = aiLevel === currentAiLevel;

        return (
          <button
            key={aiLevel}
            disabled={isActive || disabled}
            className={classNames(styles['toggle-btn'])}
            onClick={() => {
              console.log('clicl', aiLevel);
              toggleAiLevel(aiLevel);
            }}
          >
            {AI_LEVELS_NAMES[aiLevel]}
          </button>
        );
      })}
    </div>
  );
};
