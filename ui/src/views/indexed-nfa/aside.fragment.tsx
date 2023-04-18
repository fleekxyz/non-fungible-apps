import { useEffect, useRef, useState } from 'react';

import { IndexedNFAStyles as S } from './indexed-nfa.styles';

export const IndexedNFAAsideFragment: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [top, setTop] = useState(0);

  useEffect(() => {
    setTop(ref.current?.getBoundingClientRect().top ?? 0);
  }, [ref]);

  // TODO: improve fixed position on scroll
  return <S.Aside ref={ref} css={{ top }} />;
};
