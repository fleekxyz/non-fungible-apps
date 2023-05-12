import React, { useMemo } from 'react';

import { Flex, Icon, IconName, ResolvedAddress, Text } from '@/components';
import { getDate, getRepositoryFromURL, getTimeSince } from '@/utils';

import { IndexedNFA } from '../indexed-nfa.context';
import { IndexedNFAStyles as S } from '../indexed-nfa.styles';

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

        <HeaderData label="Created">{getDate(nfa.createdAt)}</HeaderData>

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
      <S.Main.SectionHeading css={{ marginTop: 0 }}>
        Description
      </S.Main.SectionHeading>
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
      [getRepositoryFromURL(nfa.gitRepository.id), 'Repository'],
      ['', 'Version'],
      [nfa.externalURL, 'Domain'],
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

const VerificationBanner: React.FC<VerificationBannerProps> = ({
  verified,
}: VerificationBannerProps) => {
  const [text, icon] = useMemo<[string, IconName]>(() => {
    if (verified)
      return ['This Non Fungible Application is Verified.', 'verified'];
    return ['This Non Fungible Application is not Verified.', 'error'];
  }, [verified]);

  return (
    <S.Main.VerificationBanner verified={verified}>
      {text}
      <Icon
        name={icon}
        css={{
          fontSize: '3.5rem',
          color: '$black',
          position: 'absolute',
          right: 'calc(8% - 1.75rem)',
          zIndex: 1,
        }}
      />
    </S.Main.VerificationBanner>
  );
};

const Verification: React.FC = () => {
  const { nfa } = IndexedNFA.useContext();

  return (
    <>
      <S.Main.SectionHeading>Verification</S.Main.SectionHeading>
      <VerificationBanner verified={nfa.verified} />
      <S.Main.DataList>
        <DataWrapper label="Verifier">
          {nfa.verifier ? (
            <ResolvedAddress>{nfa.verifier?.id}</ResolvedAddress>
          ) : (
            '-'
          )}
        </DataWrapper>
        <DataWrapper label="Repository">
          {getRepositoryFromURL(nfa.gitRepository.id)}
        </DataWrapper>
      </S.Main.DataList>
    </>
  );
};

const AccessPoints: React.FC = () => {
  const {
    nfa: { accessPoints },
  } = IndexedNFA.useContext();
  console.log(accessPoints);
  return (
    <>
      <S.Main.SectionHeading>Frontends</S.Main.SectionHeading>
      <S.Main.Table.Container>
        <S.Main.Table.Root>
          <colgroup>
            <col span={1} style={{ width: '9.5%' }} />
            <col span={1} style={{ width: '32.5%' }} />
            <col span={1} style={{ width: '32.5%' }} />
            <col span={1} style={{ width: '16%' }} />
            <col span={1} style={{ width: '9.5%' }} />
          </colgroup>
          <S.Main.Table.Head>
            <S.Main.Table.Row>
              <S.Main.Table.Data>
                <S.Main.Table.Marker />
              </S.Main.Table.Data>
              <S.Main.Table.Data>Domain</S.Main.Table.Data>
              <S.Main.Table.Data>Owner</S.Main.Table.Data>
              <S.Main.Table.Data>Created</S.Main.Table.Data>
              <S.Main.Table.Data />
            </S.Main.Table.Row>
          </S.Main.Table.Head>
          <S.Main.Table.Body>
            {accessPoints && accessPoints.length > 0 ? (
              accessPoints.map((item) => (
                <S.Main.Table.Row key={item.id}>
                  <S.Main.Table.Data align="center">
                    <S.Main.Table.Marker
                      variant={item.contentVerified ? 'active' : 'inactive'}
                    />
                  </S.Main.Table.Data>
                  <S.Main.Table.Data>{item.id}</S.Main.Table.Data>
                  <S.Main.Table.Data>
                    <ResolvedAddress>{item.owner.id}</ResolvedAddress>
                  </S.Main.Table.Data>
                  <S.Main.Table.Data>
                    {getTimeSince(item.createdAt)}
                  </S.Main.Table.Data>
                  <S.Main.Table.Data>
                    <Icon name="external-link" />
                  </S.Main.Table.Data>
                </S.Main.Table.Row>
              ))
            ) : (
              <S.Main.Table.Row>
                <S.Main.Table.Data align="center" colSpan={5}>
                  <Text>No results</Text>
                </S.Main.Table.Data>
              </S.Main.Table.Row>
            )}
          </S.Main.Table.Body>
        </S.Main.Table.Root>
      </S.Main.Table.Container>
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
      <AccessPoints />
    </S.Main.Container>
  );
};
