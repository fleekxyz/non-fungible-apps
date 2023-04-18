import React, { useMemo } from 'react';

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

type DataWrapperProps = React.PropsWithChildren<{
  label: string | number;
}>;

const DataWrapper: React.FC<DataWrapperProps> = ({
  children,
  label,
}: DataWrapperProps) => (
  <S.Main.DataContainer key={label} css={{ flex: 1, minWidth: '45%' }}>
    <Text css={{ color: '$slate12', fontWeight: 700 }}>{children || '-'}</Text>
    <Text css={{ color: '$slate11' }}>{label}</Text>
  </S.Main.DataContainer>
);

const Traits: React.FC = () => {
  const { nfa } = IndexedNFA.useContext();

  const traitsToShow = useMemo(() => {
    return [
      [nfa.ENS, 'ENS'],
      [nfa.gitRepository.id, 'Repository'],
      [10, 'Version'],
      [nfa.externalURL, 'Domain'],
      [nfa.externalURL, 'Domain 2'],
    ];
  }, [nfa]);

  return (
    <>
      <S.Main.SectionHeading>Traits</S.Main.SectionHeading>
      <S.Main.DataList>
        {traitsToShow.map(([value, label]) => (
          <DataWrapper key={label} label={label}>
            {value}
          </DataWrapper>
        ))}
      </S.Main.DataList>
    </>
  );
};

type VerificationBannerProps = {
  verified: boolean;
};

// TODO: add banner icon
const VerificationBanner: React.FC<VerificationBannerProps> = ({
  verified,
}: VerificationBannerProps) => {
  const text = useMemo(() => {
    if (verified) return 'This Non Fungible Application is Verified.';
    return 'This Non Fungible Application is not Verified.';
  }, [verified]);

  return (
    <S.Main.VerificationBanner verified={verified}>
      {text}
    </S.Main.VerificationBanner>
  );
};

const Verification: React.FC = () => {
  return (
    <>
      <S.Main.SectionHeading>Verification</S.Main.SectionHeading>
      <VerificationBanner verified={true} />
      <S.Main.DataList>
        <DataWrapper label="Verifier">polygon.eth</DataWrapper>
        <DataWrapper label="Repository">polygon/fe</DataWrapper>
      </S.Main.DataList>
    </>
  );
};

export const IndexedNFAMainFragment: React.FC = () => {
  return (
    <S.Main.Container>
      <Header />
      <Description />
      <Traits />
      <Verification />
    </S.Main.Container>
  );
};
