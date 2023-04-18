import React from 'react';

import { Flex, ResolvedAddress, Text } from '@/components';

import { IndexedNFA } from './indexed-nfa.context';
import { IndexedNFAStyles as S } from './indexed-nfa.styles';

type HeaderDataProps = {
  label: string;
  children: React.ReactNode;
};

const HeaderData: React.FC<HeaderDataProps> = ({
  label,
  children,
}: HeaderDataProps) => (
  <Flex css={{ gap: '$2' }}>
    <Text css={{ color: '$slate11' }}>{label}</Text>
    <Text css={{ color: '$slate12' }}>{children}</Text>
  </Flex>
);

const Header: React.FC = () => {
  const { nfa } = IndexedNFA.useContext();

  return (
    <>
      <S.Main.Heading>{nfa.name}</S.Main.Heading>
      <Flex css={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <HeaderData label="Owner">
          <ResolvedAddress>{nfa.owner.id}</ResolvedAddress>
        </HeaderData>

        <S.Main.Divider.Elipse />

        <HeaderData label="Created">12/12/22</HeaderData>

        <S.Main.Divider.Elipse />

        <HeaderData label="Access Points">
          {nfa.accessPoints?.length ?? 0}
        </HeaderData>
      </Flex>
      <S.Main.Divider.Line />
    </>
  );
};

const Description: React.FC = () => {
  const { nfa } = IndexedNFA.useContext();

  return (
    <>
      <S.Main.SectionHeading>Description</S.Main.SectionHeading>
      <S.Main.DataContainer as={S.Main.Paragraph}>
        {nfa.description}
      </S.Main.DataContainer>
    </>
  );
};

export const IndexedNFAMainFragment: React.FC = () => {
  return (
    <S.Main.Container>
      <Header />
      <Description />
    </S.Main.Container>
  );
};
