// context
import { useToasterContext } from '../../providers/toaster/toaster.context';

// components
import { ToasterMessage } from './toaster-message';

// styles
import styles from './toaster.module.css';

export function ToasterMessages(): JSX.Element | null {
  const { messages } = useToasterContext();

  return (
    <>
      {messages.length ? (
        <div className={styles['toaster-wrap']}>
          {messages.map(message => {
            if (!message.message) return null;

            return <ToasterMessage key={message.unique} message={message} />;
          })}
        </div>
      ) : null}
    </>
  );
}
