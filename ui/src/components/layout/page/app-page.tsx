import React from 'react';

import { NavBar } from '@/components';

import { GradientOverlay } from './gradient-overlay';
import { PageStyles as PS } from './page.styles';

export type AppPageProps = {
  children: React.ReactNode;
};

export const AppPage: React.FC<AppPageProps> = ({ children }: AppPageProps) => {
  return (
    <>
      <GradientOverlay />
      <NavBar />
      <PS.Content>{children}</PS.Content>
    </>
  );
};

AppPage.displayName = 'AppPage';
