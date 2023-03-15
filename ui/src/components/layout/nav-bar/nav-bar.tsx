import { Button } from '@/components/core';
import { Logo } from '@/components/logo/logo';
import { Link } from 'react-router-dom';
import { ConnectWalletButton } from './connect-wallet-button';
import { NavBarStyles as Styles } from './nav-bar.styles';

export const NavBar: React.FC = () => {
  return (
    <Styles.Container>
      <Styles.Content>
        <Logo />
        <Styles.Navigation>
          <Button variant="link" color="gray">
            <Link to="/">Home</Link>
          </Button>
          <Button variant="link" color="gray">
            <Link to="/mint">Create</Link>
          </Button>
          <ConnectWalletButton />
        </Styles.Navigation>
      </Styles.Content>
    </Styles.Container>
  );
};
