import { useRef } from 'react';

export const useDebounce = <A extends any[], F extends (...args: A) => void>(
  f: F,
  t = 500
) => {
  const timeOutRef = useRef<NodeJS.Timeout>();

  return (...args: A) => {
    timeOutRef.current && clearTimeout(timeOutRef.current);
    timeOutRef.current = setTimeout(() => {
      f(...args);
    }, t);
  };
};
