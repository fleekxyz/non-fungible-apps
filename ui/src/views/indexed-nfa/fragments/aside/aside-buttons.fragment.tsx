import { Button, Flex, Icon, IconName, Menu } from '@/components';
import { env } from '@/constants';
import { FleekERC721 } from '@/integrations/ethereum/contracts';
import { forwardStyledRef } from '@/theme';
import { AppLog } from '@/utils';

import { IndexedNFA } from '../../indexed-nfa.context';
import { IndexedNFAStyles as S } from '../../indexed-nfa.styles';

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

export const ButtonsFragment: React.FC = () => {
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
          {/* TODO remove span and render as fragment */}
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
