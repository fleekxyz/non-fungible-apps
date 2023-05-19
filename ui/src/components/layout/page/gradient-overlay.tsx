import { useAppStore } from '@/store';

import { PageStyles as PS } from './page.styles';

export const GradientOverlay: React.FC = () => {
  const { overlayColor } = useAppStore();

  if (!overlayColor) return null;

  return (
    <PS.GradientOverlay
      css={{
        background: `linear-gradient(180deg, #${overlayColor}59 0%, transparent 30%)`,
      }}
    />
  );
};
