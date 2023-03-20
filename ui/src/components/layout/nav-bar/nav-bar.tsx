import { Link } from 'react-router-dom';

import { Button } from '@/components/core';
import { Logo } from '@/components/logo/logo';

import { ConnectWalletButton } from './connect-wallet-button';
import { NavBarStyles as Styles } from './nav-bar.styles';

export const NavBar: React.FC = () => {
  return (
    <Styles.Container>
      <Styles.Content>
        <Logo />
        <Styles.Navigation>
          <Button as={Link} to="/" variant="link" color="gray">
            Home
          </Button>
          <Button as={Link} to="/mint" variant="link" color="gray">
            Mint
          </Button>
          <ConnectWalletButton />
        </Styles.Navigation>
      </Styles.Content>
    </Styles.Container>
  );
};
