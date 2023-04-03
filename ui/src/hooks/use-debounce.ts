import { useRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useDebounce = <A extends any[], F extends (...args: A) => void>(
  f: F,
  t = 500
): ((...args: A) => void) => {
  const timeOutRef = useRef<NodeJS.Timeout>();

  return (...args: A) => {
    timeOutRef.current && clearTimeout(timeOutRef.current);
    timeOutRef.current = setTimeout(() => {
      f(...args);
    }, t);
  };
};
