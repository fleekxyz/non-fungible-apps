import { Icon } from '../core/icon';
import LogoFleek from '@/assets/fleek-logo.svg';
import { useNavigate } from 'react-router-dom';
import { LogoStyles as LS } from './logo.styles';

export const Logo = () => {
  const navigate = useNavigate();
  return (
    <LS.Container onClick={() => navigate('/home')}>
      {/* TODO replace for Icon once I get svg */}
      <LS.Logo src={LogoFleek} />
      <Icon name="fleekName" css={{ fontSize: '$6xl', mr: '$3' }} />
      <Icon name="betaTag" css={{ fontSize: '$5xl' }} />
    </LS.Container>
  );
};
