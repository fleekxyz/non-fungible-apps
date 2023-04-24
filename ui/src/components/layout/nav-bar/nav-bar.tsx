import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { Button, Icon } from '@/components/core';
import { Logo } from '@/components/logo/logo';
import { useMediaQuery } from '@/hooks';
import { forwardStyledRef } from '@/theme';

import { ConnectWalletButton } from './connect-wallet-button';
import { NavBarStyles as Styles } from './nav-bar.styles';

const Navigation = forwardStyledRef<
  HTMLDivElement,
  React.ComponentPropsWithRef<typeof Styles.Navigation>
>((props, ref) => (
  <Styles.Navigation {...props} ref={ref}>
    <Button as={Link} to="/explore" variant="link" color="gray">
      Explore
    </Button>
    <Button as={Link} to="/mint" variant="link" color="gray">
      Create
    </Button>
    <Button as={Link} to="/" variant="link" color="gray">
      Learn
    </Button>
  </Styles.Navigation>
));

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const handleToggle = (): void => setIsOpen(!isOpen);

  const handleNavigationClick = (): void => setIsOpen(false);

  useEffect(() => {
    if (!isOpen) return;
    const { current } = sidebarRef;
    if (!current) return;

    const handleClickOutside = (event: MouseEvent): void => {
      if (current && !current.contains(event.target as Node)) setIsOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, sidebarRef]);

  return (
    <>
      <Button
        onClick={handleToggle}
        css={{ gridArea: 'menu', fontSize: '$lg' }}
      >
        <Icon name="menu" />
      </Button>

      <Styles.Sidebar.Backdrop open={isOpen} />

      <Styles.Sidebar.Content open={isOpen} ref={sidebarRef}>
        <Navigation stacked onClick={handleNavigationClick} />
      </Styles.Sidebar.Content>
    </>
  );
};

export const NavBar: React.FC = () => {
  const enableSidebar = useMediaQuery('(max-width: 540px)');

  return (
    <Styles.Container>
      <Styles.Content>
        <Logo />

        {!enableSidebar && <Navigation />}

        <ConnectWalletButton />

        {enableSidebar && <Sidebar />}
      </Styles.Content>
    </Styles.Container>
  );
};
