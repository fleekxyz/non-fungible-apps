import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { App } from '@/app.context';
import { Button } from '@/components';
import { parseNumberToHexColor } from '@/utils/color';

import { IndexedNFA } from '../../indexed-nfa.context';
import { IndexedNFAStyles as S } from '../../indexed-nfa.styles';
import { ButtonsFragment } from './aside-buttons.fragment';
import { Header } from './aside-header.fragment';
import { NFAInfo } from './aside-nfa-info.fragment';
import { Preview } from './aside-preview.fragment';
import { TabFragment } from './aside-tabs.fragment';

export const IndexedNFAAsideFragment: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [top, setTop] = useState<number>();
  const { nfa } = IndexedNFA.useContext();

  const { backgroundColor } = App.useContext();
  const background = `radial-gradient(closest-corner circle at 90% 45%, #${backgroundColor}8c 1% ,#${backgroundColor}57 20%, transparent 40%), radial-gradient(closest-corner circle at 60% 25%, #${backgroundColor} 3%, #${backgroundColor}73 30%, #181818 70%)`;

  useEffect(() => {
    setTop(ref.current?.getBoundingClientRect().top);
  }, [ref]);

  return (
    <S.Aside.Container
      ref={ref}
      css={{ top, background, backdropFilter: 'blur(10px)' }}
    >
      <Preview />
      <Header />
      <NFAInfo />
      <ButtonsFragment />
      <Button
        as={Link}
        to={`/create-ap/${nfa.tokenId}`}
        css={{
          backgroundColor: `#${parseNumberToHexColor(nfa.color)}`,
          color: 'white',
        }}
      >{`Host ${nfa.name} NFA`}</Button>
      <TabFragment />
    </S.Aside.Container>
  );
};
