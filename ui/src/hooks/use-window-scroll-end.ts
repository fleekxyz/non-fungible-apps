import { useEffect } from 'react';

import { useDebounce } from './use-debounce';

export const useWindowScrollEnd = (callback: () => void): void => {
  const debounced = useDebounce(() => {
    const { scrollHeight, scrollTop, offsetHeight } = document.documentElement;
    if (scrollHeight - 100 > scrollTop + offsetHeight) return;
    callback();
  }, 100);

  useEffect(() => {
    debounced();
    window.addEventListener('scroll', debounced);
    return () => window.removeEventListener('scroll', debounced);
  }, [debounced]);
};
