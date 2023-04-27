import { useNavigate } from 'react-router-dom';

import { Icon } from '../../core/icon';
import { NavBarStyles as S } from './nav-bar.styles';

export const Logo: React.FC = () => {
  const navigate = useNavigate();
  return (
    <S.Logo.Wrapper onClick={() => navigate('/home')}>
      <Icon
        name="fleek-logo"
        css={{ fontSize: '$2xl' }}
        iconElementCss={{ height: '$6' }}
      />
      <Icon name="fleek-name" css={{ fontSize: '$6xl', mr: '$3' }} />
      <Icon name="beta-tag" css={{ fontSize: '$5xl' }} />
    </S.Logo.Wrapper>
  );
};
