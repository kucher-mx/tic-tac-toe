import React from 'react';
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
        return (
          <React.Fragment key={aiLevel}>
            <input
              type="radio"
              id={aiLevel}
              disabled={disabled}
              name={aiLevel}
              checked={aiLevel === currentAiLevel}
              onChange={() => toggleAiLevel(aiLevel)}
            />
            <label className={styles['label']} htmlFor={aiLevel}>
              {AI_LEVELS_NAMES[aiLevel]}
            </label>
          </React.Fragment>
        );
      })}
    </div>
  );
};
