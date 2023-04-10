import { useNavigate } from 'react-router-dom';

import { Icon } from '../core/icon';
import { LogoStyles as LS } from './logo.styles';

export const Logo: React.FC = () => {
  const navigate = useNavigate();
  return (
    <LS.Container onClick={() => navigate('/home')}>
      <Icon
        name="fleekLogo"
        css={{ fontSize: '$2xl' }}
        iconElementCss={{ height: '$6' }}
      />
      <Icon name="fleekName" css={{ fontSize: '$6xl', mr: '$3' }} />
      <Icon name="betaTag" css={{ fontSize: '$5xl' }} />
    </LS.Container>
  );
};
