import { useMediaQuery } from '@/hooks';

import { Logo } from './logo';
import { NavBarStyles as Styles } from './nav-bar.styles';
import { NavBarConnectWalletButton } from './navbar-connect-wallet-button';
import { Navigation } from './navigation';
import { Sidebar } from './sidebar';

export const NavBar: React.FC = () => {
  const enableSidebar = useMediaQuery('(max-width: 540px)');

  return (
    <Styles.Container>
      <Styles.Content>
        <Logo />
        <NavBarConnectWalletButton />
        {enableSidebar ? <Sidebar /> : <Navigation />}
      </Styles.Content>
    </Styles.Container>
  );
};
