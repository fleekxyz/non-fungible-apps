import { useMemo, useState } from 'react';

import { Flex } from '@/components';
import { getRepositoryFromURL } from '@/utils';

import { IndexedNFA } from '../../indexed-nfa.context';
import { IndexedNFAStyles as S } from '../../indexed-nfa.styles';
import { Tab, TabContainer } from '../../tabs';

const OverviewFragment: React.FC = () => {
  const { nfa } = IndexedNFA.useContext();

  return (
    <S.Aside.Overview.Container
      css={{ gap: '$4h', p: '$5 $6', height: '336px' }}
    >
      <S.Aside.Overview.Row.Container>
        <S.Aside.Overview.Row.Label>Token ID</S.Aside.Overview.Row.Label>
        <S.Aside.Overview.Row.Value>{nfa.tokenId}</S.Aside.Overview.Row.Value>
      </S.Aside.Overview.Row.Container>
      <S.Aside.Divider.Line />
      <S.Aside.Overview.Row.Container>
        <S.Aside.Overview.Row.Label>Network</S.Aside.Overview.Row.Label>
        <S.Aside.Overview.Row.Value>Mainnet</S.Aside.Overview.Row.Value>
      </S.Aside.Overview.Row.Container>
      <S.Aside.Divider.Line />
      <S.Aside.Overview.Row.Container>
        <S.Aside.Overview.Row.Label>Standard</S.Aside.Overview.Row.Label>
        <S.Aside.Overview.Row.Value>ERC_721</S.Aside.Overview.Row.Value>
      </S.Aside.Overview.Row.Container>
      <S.Aside.Divider.Line />
      <S.Aside.Overview.Row.Container>
        <S.Aside.Overview.Row.Label>Description</S.Aside.Overview.Row.Label>
      </S.Aside.Overview.Row.Container>
      <S.Aside.Overview.Description css={{ overflowY: 'scroll' }}>
        {nfa.description}
      </S.Aside.Overview.Description>
    </S.Aside.Overview.Container>
  );
};

const PropertiesFragment: React.FC = () => {
  const { nfa } = IndexedNFA.useContext();

  const traitsToShow = useMemo(() => {
    return [
      [nfa.ENS, 'ENS'],
      [getRepositoryFromURL(nfa.gitRepository.id), 'Repository'],
      [nfa.externalURL, 'Domain'],
    ];
  }, [nfa]);

  return (
    <Flex css={{ flexDirection: 'column', gap: '$3', height: '336px' }}>
      {traitsToShow.map(([value, label], index) => (
        <S.Aside.Overview.Container
          css={{ gap: '$1', p: '$2h $4' }}
          key={index}
        >
          <S.Aside.Overview.Row.Value>
            {value || '-'}
          </S.Aside.Overview.Row.Value>
          <S.Aside.Overview.Row.Label>{label}</S.Aside.Overview.Row.Label>
        </S.Aside.Overview.Container>
      ))}
    </Flex>
  );
};

export const TabFragment: React.FC = () => {
  const [tabSelected, setTabSelected] = useState<number>(0);
  const handleClick = (index: number): void => {
    setTabSelected(index);
  };

  return (
    <>
      <TabContainer>
        {['Overview', 'Properties'].map((label, index) => (
          <Tab
            key={index}
            index={index}
            label={label}
            active={index === tabSelected}
            onTabClick={handleClick}
          />
        ))}
      </TabContainer>
      {tabSelected === 0 ? <OverviewFragment /> : <PropertiesFragment />}
    </>
  );
};
