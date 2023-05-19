import { NavBar } from '@/components';
import { useAppStore } from '@/store';

import { PageStyles as PS } from './page.styles';

export type AppPageProps = {
  children: React.ReactNode;
};

export const AppPage: React.FC<AppPageProps> = ({ children }: AppPageProps) => {
  const { backgroundColor } = useAppStore();
  const background =
    backgroundColor &&
    `linear-gradient(180deg, #${backgroundColor}59 0%, transparent 30%)`;

  return (
    <PS.Container
      css={{
        background: background,
      }}
    >
      <NavBar />
      <PS.Content as="main">{children}</PS.Content>
    </PS.Container>
  );
};

AppPage.displayName = 'AppPage';
