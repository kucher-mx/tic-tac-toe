import React from 'react';

// types
import { ToasterContextType } from './toaster.types';

export const toasterContext = React.createContext<ToasterContextType>({
  bug: () => {},
  info: () => {},
  warning: () => {},
  success: () => {},
  removeToasterMessage: () => {},
  messages: [],
});

export const useToasterContext = () => {
  const context = React.useContext(toasterContext);
  if (!context) {
    throw new Error('useToaster must be used within a ToasterProvider');
  }
  return context;
};
