import { useEffect } from 'react';

import { useDebounce } from './use-debounce';

export const useWindowScrollEnd = (
  callback: () => void,
  threshold = 0.3 // threshold used to recognize scroll end (30% of the remaining scroll)
): void => {
  const debounced = useDebounce(() => {
    const { scrollHeight, scrollTop, offsetHeight } = document.documentElement;
    if (scrollHeight * (1 - threshold) > scrollTop + offsetHeight) return;
    callback();
  }, 100);

  useEffect(() => {
    debounced();
    window.addEventListener('scroll', debounced);
    return () => window.removeEventListener('scroll', debounced);
  }, [debounced]);
};
