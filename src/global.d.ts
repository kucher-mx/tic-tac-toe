declare module '*.module.css';
declare module '*.svg';

type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};
