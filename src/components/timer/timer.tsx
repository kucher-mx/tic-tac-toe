import { useState, useEffect } from 'react';
import classNames from 'classnames';

// styles
import styles from './timer.module.css';

type Props = {
  deadline: number;
  showDays?: boolean;
  showHours?: boolean;
  showMinutes?: boolean;
  showSeconds?: boolean;
};
export const Timer = ({ deadline, showDays, showHours, showMinutes, showSeconds }: Props) => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const time = deadline - Date.now();

      setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
      setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
      setMinutes(Math.floor((time / 1000 / 60) % 60));
      setSeconds(Math.floor((time / 1000) % 60));
    }, 100);

    return () => clearInterval(interval);
  }, [deadline]);

  return (
    <div className={classNames(styles.timer)}>
      {(days > 0 || showDays) && (
        <span className={classNames(styles.days)}>{`0${Math.max(days, 0)}`.slice(-2)}:</span>
      )}
      {(hours > 0 || showHours) && (
        <span className={classNames(styles.hours)}>{`0${Math.max(hours, 0)}`.slice(-2)}:</span>
      )}
      {(minutes > 0 || showMinutes) && (
        <span className={classNames(styles.minutes)}>{`0${Math.max(minutes, 0)}`.slice(-2)}:</span>
      )}
      {(seconds > 0 || showSeconds) && (
        <span className={classNames(styles.seconds)}>{`0${Math.max(seconds, 0)}`.slice(-2)}</span>
      )}
    </div>
  );
};
