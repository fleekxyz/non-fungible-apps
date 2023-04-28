import { useEffect, useRef, useState } from 'react';

import { Button, Icon } from '@/components/core';

import { NavBarStyles as Styles } from './nav-bar.styles';
import { Navigation } from './navigation';

export const Sidebar: React.FC = () => {
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
