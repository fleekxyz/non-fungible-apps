import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { App } from '@/app.context';
import {
  Button,
  Flex,
  Icon,
  IconName,
  Menu,
  NFAIcon,
  NFAPreview,
  ResolvedAddress,
  Text,
} from '@/components';
import { env } from '@/constants';
import { FleekERC721 } from '@/integrations/ethereum/contracts';
import { forwardStyledRef } from '@/theme';
import { AppLog } from '@/utils';
import { parseNumberToHexColor } from '@/utils/color';

import { IndexedNFA } from '../indexed-nfa.context';
import { IndexedNFAStyles as S } from '../indexed-nfa.styles';
import { Tab, TabContainer } from './tabs';

const Preview: React.FC = () => {
  const { nfa } = IndexedNFA.useContext();

  const color = useMemo(
    () => `#${parseNumberToHexColor(nfa.color ?? '')}`,
    [nfa]
  );

  return (
    <NFAPreview
      color={color}
      logo={nfa.logo}
      ens={nfa.ENS}
      name={nfa.name}
      size="100%"
      css={{
        borderRadius: '$lg',
        border: '1px solid $slate6',
      }}
    />
  );
};

type BadgeProps = {
  verified: boolean;
};

const Badge: React.FC<BadgeProps> = ({ verified }: BadgeProps) => {
  const text = useMemo(
    () => (verified ? 'Verified' : 'Unverified'),
    [verified]
  );

  const icon = useMemo(() => (verified ? 'verified' : 'error'), [verified]);
  const color = useMemo(() => (verified ? '$green10' : '$red10'), [verified]);
  return (
    <S.Aside.Header.Badge verified={verified}>
      <Icon name={icon} css={{ color: color }} />
      {text}
    </S.Aside.Header.Badge>
  );
};

const Header: React.FC = () => {
  const { nfa } = IndexedNFA.useContext();

  return (
    <S.Aside.Header.Wrapper>
      <S.Aside.Header.Container>
        <S.Aside.Header.Header>{nfa.name}</S.Aside.Header.Header>
        {/* TODO remove once subrgraph integration is merged */}
        <Badge verified={Math.random() > 0.5} />
      </S.Aside.Header.Container>

      <Flex css={{ gap: '$1h' }}>
        <NFAIcon image={nfa.logo} color={'white'} />
        <ResolvedAddress>{nfa.owner.id}</ResolvedAddress>
      </Flex>
    </S.Aside.Header.Wrapper>
  );
};

type HeaderDataProps = {
  label: string;
  children: React.ReactNode;
};

const HeaderData: React.FC<HeaderDataProps> = ({
  label,
  children,
}: HeaderDataProps) => (
  <Flex css={{ gap: '$2', fontSize: '14px', fontWeight: '400' }}>
    <Text css={{ color: '$slate11' }}>{label}</Text>
    <Text css={{ color: '$slate12' }}>{children}</Text>
  </Flex>
);

const NFAInfo: React.FC = () => {
  const { nfa } = IndexedNFA.useContext();
  return (
    <Flex css={{ alignItems: 'center', gap: '$2h' }}>
      <HeaderData label="Hosted NFAs">
        {nfa.accessPoints?.length ?? 0}
      </HeaderData>

      <S.Aside.Divider.Elipse />

      <HeaderData label="Created">
        {/* TODO: place correct data */}
        12/12/22
      </HeaderData>
    </Flex>
  );
};

type CustomButtonProps = {
  icon: IconName;
};

const CustomButon = forwardStyledRef<HTMLButtonElement, CustomButtonProps>(
  ({ icon, ...props }, ref) => (
    <Button
      ref={ref}
      {...props}
      css={{ borderRadius: '0.375rem', padding: '$2', color: 'white' }}
    >
      <Icon name={icon} />
    </Button>
  )
);

type MenuItemProps = {
  label: string;
  iconName: IconName;
  onClick: () => void;
};

const MenuItem: React.FC<MenuItemProps> = ({
  label,
  iconName,
  onClick,
}: MenuItemProps) => {
  return (
    <Flex onClick={onClick} css={{ gap: '$2' }}>
      <Icon name={iconName} />
      {label}
    </Flex>
  );
};

const ButtonsFragment: React.FC = () => {
  const { nfa } = IndexedNFA.useContext();

  const handleShareOnClick = (): void => {
    const location = window.location.href;
    navigator.clipboard.writeText(location);
    AppLog.successToast('Link copied to clipboard');
  };

  const handleShareOpenSeaOnClick = (): void => {
    window.open(
      `https://${
        env.environment === 'development' ? 'testnets' : ''
      }.opensea.io/assets/${
        env.environment === 'development' ? 'goerli' : 'ethereum'
      }/${FleekERC721.address}/${nfa.tokenId}`,
      '_blank'
    );
  };

  const handleShareOnTwitterOnClick = (): void => {
    window.open(env.twitter.url, '_blank'); //TODO replace with twitter share
  };

  return (
    <S.Aside.Button.Container>
      <Menu.Root>
        <Menu.Button as={CustomButon} icon={'three-dots'} />
        <Menu.Items css={{ minWidth: '12rem' }}>
          <span>
            <MenuItem
              label="Open on OpenSea"
              iconName="opensea"
              onClick={handleShareOpenSeaOnClick}
            />
          </span>
          <span>
            <MenuItem
              label="Share to Twitter"
              iconName="twitter"
              onClick={handleShareOnTwitterOnClick}
            />
          </span>
        </Menu.Items>
      </Menu.Root>

      {/* TODO add tooltip to copy link */}
      <CustomButon icon="share" onClick={handleShareOnClick} />
    </S.Aside.Button.Container>
  );
};

const PropertiesFragment: React.FC = () => {
  const { nfa } = IndexedNFA.useContext();

  //TODO replace with real data
  const traitsToShow = useMemo(() => {
    return [
      [nfa.ENS, 'ENS'],
      [nfa.gitRepository.id, 'Repository'],
      [10, 'Version'],
      [nfa.externalURL, 'Domain'],
    ];
  }, [nfa]);

  return (
    <Flex css={{ flexDirection: 'column', gap: '$3' }}>
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

const OverviewFragment: React.FC = () => {
  const { nfa } = IndexedNFA.useContext();

  return (
    <S.Aside.Overview.Container css={{ gap: '$4h', p: '$6' }}>
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
      <S.Aside.Overview.Description>
        {nfa.description}
      </S.Aside.Overview.Description>
    </S.Aside.Overview.Container>
  );
};

const TabFragment: React.FC = () => {
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

export const IndexedNFAAsideFragment: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [top, setTop] = useState<number>();
  const { nfa } = IndexedNFA.useContext();

  const { backgroundColor } = App.useContext();
  const background = `linear-gradient(230deg, #${backgroundColor} 0%, #181818 80%)`;

  useEffect(() => {
    setTop(ref.current?.getBoundingClientRect().top);
  }, [ref]);

  return (
    <S.Aside.Container
      ref={ref}
      css={{ top, background: background, backdropFilter: 'blur(10px)' }}
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
