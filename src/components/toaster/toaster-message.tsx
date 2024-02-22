import React, { useState, useEffect } from 'react';

// context
import { useToasterContext } from '../../providers/toaster/toaster.context';

// consts
import { TOASTER_DURATION } from '../../providers/toaster/toaster.consts';

// types
import type { ToasterMessage } from '../../providers/toaster/toaster.types';

// styles
import styles from './toaster.module.css';
import classNames from 'classnames';

type Props = {
  message: ToasterMessage;
};

export function ToasterMessage({ message }: Props): JSX.Element {
  const { removeToasterMessage } = useToasterContext();

  const [isPausedToast, setPausedToast] = useState(false);

  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [needClose, setNeedClose] = useState(false);

  const isError = message.type === 'error';
  const isSuccess = message.type === 'success';
  const isInfo = message.type === 'info';
  const isWarning = message.type === 'warning';

  const swipeSensativeAmountPixels = 70;

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const resetStyles = () => {
    document.documentElement.style.setProperty('--transform-toast', '0');
    document.documentElement.style.setProperty('--toast-transition-TOASTER_DURATION', '0');
  };

  const handleClickToast = () => {
    if (!isPausedToast) setPausedToast(true);
  };

  useEffect(() => {
    let toastTimeout: number | null = null;
    if (needClose) {
      document.documentElement.style.setProperty('--transform-toast', '110%');
      document.documentElement.style.setProperty('--toast-transition-TOASTER_DURATION', '0.3s');
      toastTimeout = window.setTimeout(() => {
        removeToasterMessage(message.unique);
      }, 300);
    }
    return () => {
      if (toastTimeout) window.clearTimeout(toastTimeout);
    };
  }, [needClose]);

  useEffect(() => {
    resetStyles();
    document.documentElement.style.setProperty(
      '--toaster-half-time-animation',
      `${TOASTER_DURATION / 2}ms`,
    );
    document.documentElement.style.setProperty('--toaster-time-animation', `${TOASTER_DURATION}ms`);

    return () => {
      resetStyles();
    };
  }, []);

  useEffect(() => {
    if (touchStart && touchEnd) {
      const deltaX = `${touchEnd - touchStart}px`;
      document.documentElement.style.setProperty('--transform-toast', `${deltaX}`);
    }
  }, [touchStart, touchEnd]);

  useEffect(() => {
    let toastTimeout: number | null = null;
    if (isPausedToast) {
      if (toastTimeout) window.clearTimeout(toastTimeout);
    } else {
      toastTimeout = window.setTimeout(() => {
        removeToasterMessage(message.unique);
      }, TOASTER_DURATION);
    }
    return () => {
      if (toastTimeout) window.clearTimeout(toastTimeout);
    };
  }, [isPausedToast]);

  const handleTouchEnd = (unique: string) => {
    if (touchEnd && touchStart - touchEnd > swipeSensativeAmountPixels) {
      document.documentElement.style.setProperty('--transform-toast', '-110%');
      document.documentElement.style.setProperty('--toast-transition-TOASTER_DURATION', '0.3s');

      removeToasterMessage(unique);
    } else if (touchEnd && touchStart - touchEnd < -swipeSensativeAmountPixels) {
      document.documentElement.style.setProperty('--transform-toast', '110%');
      document.documentElement.style.setProperty('--toast-transition-TOASTER_DURATION', '0.3s');
      removeToasterMessage(unique);
    }
    resetStyles();
  };

  return (
    <div
      role="button"
      onClick={handleClickToast}
      onKeyDown={handleClickToast}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={() => handleTouchEnd(message.unique)}
      tabIndex={0}
      className={classNames(styles['toaster-message'], styles[message.type], {
        [styles['toaster-open']]: isPausedToast,
      })}
    >
      <div className={styles['toaster-header']}>
        {message.header
          ? message.header
          : isError
          ? 'Помилка'
          : isSuccess
          ? 'Успіх'
          : isInfo
          ? 'Інформація'
          : isWarning
          ? 'Увага'
          : null}
      </div>
      <div className={styles['toaster-body']}>{message.message}</div>
      {isPausedToast ? (
        <button onClick={() => setNeedClose(true)} className={styles['toaster-close']}>
          ✕
        </button>
      ) : (
        <div className={styles['toaster-loader']} />
      )}
    </div>
  );
}
