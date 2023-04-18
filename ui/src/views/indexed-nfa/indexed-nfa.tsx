import { useEffect, useRef, useState } from 'react';

import { styled } from '@/theme';

const E = {
  Grid: styled('div', {
    position: 'relative',
    display: 'grid',
    gridTemplateAreas: '"aside main"',
  }),

  Aside: styled('div', {
    position: 'sticky',
    top: 0,
    gridArea: 'aside',
    backgroundColor: 'red',
    height: '20rem',
  }),

  Main: styled('main', {
    gridArea: 'main',
    backgroundColor: 'blue',
    height: '200vh',
  }),
};

const PositionedAside: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [top, setTop] = useState(0);

  useEffect(() => {
    setTop(ref.current?.getBoundingClientRect().top ?? 0);
  }, [ref]);

  // TODO: improve fixed position on scroll
  return <E.Aside ref={ref} css={{ top }} />;
};

export const IndexedNFAView: React.FC = () => {
  return (
    <E.Grid>
      <PositionedAside />
      <E.Main />
    </E.Grid>
  );
};
