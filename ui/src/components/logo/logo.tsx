import { Icon } from '../core/icon';
import { Flex } from '../layout';
import LogoFleek from '@/assets/fleek-logo.svg';
import { useNavigate } from 'react-router-dom';

export const Logo = () => {
  const navigate = useNavigate();
  return (
    <Flex onClick={() => navigate('/home')} css={{ cursor: 'pointer' }}>
      <img src={LogoFleek} height="auto" width="25px" />
      <Icon name="fleekName" css={{ fontSize: '64px', mr: '$3' }} />
      <Icon name="betaTag" css={{ fontSize: '43px' }} />
    </Flex>
  );
};
