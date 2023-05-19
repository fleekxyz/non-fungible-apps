import { useAppStore } from '@/store';

import { PageStyles as PS } from './page.styles';

export const GradientOverlay: React.FC = () => {
  const { backgroundColor } = useAppStore();

  if (!backgroundColor) return null;

  return (
    <PS.GradientOverlay
      css={{
        background: `linear-gradient(180deg, #${backgroundColor}59 0%, transparent 30%)`,
      }}
    />
  );
};
