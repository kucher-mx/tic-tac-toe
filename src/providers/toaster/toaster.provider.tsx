import React, { useCallback, useMemo, useState } from 'react';

// context
import { toasterContext } from './toaster.context';

// types
import type { ToasterContextType, ToasterMessage, ToasterTypes } from './toaster.types';

type Props = {
  children: React.ReactNode;
};

export const ToasterProvider = ({ children }: Props) => {
  const [messages, setMessages] = useState<ToasterMessage[]>([]);

  const addToasterMessage = useCallback(
    (message: string, header: string, type: ToasterTypes): void => {
      console.log({ message, type });
      setMessages(prev => [
        ...prev,
        {
          type,
          message,
          header,
          unique: Math.random().toString(36).substring(2) + Date.now().toString(36),
        },
      ]);
    },
    [],
  );

  const bug = useCallback(
    (rawError: Error | string, header = '') => {
      if (rawError instanceof Error) {
        addToasterMessage(rawError.message, header, 'error');
      } else {
        addToasterMessage(rawError, header, 'error');
      }
    },
    [addToasterMessage],
  );

  const success = useCallback(
    (message: string, header = '') => {
      addToasterMessage(message, header, 'success');
    },
    [addToasterMessage],
  );

  const info = useCallback(
    (message: string, header = '') => {
      addToasterMessage(message, header, 'info');
    },
    [addToasterMessage],
  );

  const warning = useCallback(
    (message: string, header = ''): void => {
      addToasterMessage(message, header, 'warning');
    },
    [addToasterMessage],
  );

  const removeToasterMessage = useCallback((unique: string) => {
    setMessages(prev => prev.filter(message => unique !== message.unique));
  }, []);

  const memoContext = useMemo<ToasterContextType>(
    () => ({
      addToasterMessage,
      removeToasterMessage,
      bug,
      info,
      warning,
      success,
      messages,
    }),
    [addToasterMessage, bug, info, messages, removeToasterMessage, success, warning],
  );

  return <toasterContext.Provider value={memoContext}>{children}</toasterContext.Provider>;
};
