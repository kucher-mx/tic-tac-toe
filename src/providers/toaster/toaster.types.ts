import type { ToasterProvider } from './toaster.provider';

export type ToasterTypes = 'error' | 'success' | 'info' | 'warning';

export type ToasterMessage = {
  type: ToasterTypes;
  message: string;
  header: string;
  unique: string;
};

export type ToasterContextType = {
  bug: (rawError: Error | string, header?: string) => void;
  info: (message: string, header?: string) => void;
  warning: (message: string, header?: string) => void;
  success: (message: string, header?: string) => void;
  removeToasterMessage: (unique: string) => void;
  addToasterMessage?: (message: string, header: string, type: ToasterTypes) => void;
  messages: ToasterMessage[];
};
