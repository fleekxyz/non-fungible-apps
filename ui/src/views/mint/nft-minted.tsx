import { useNavigate } from 'react-router-dom';

import { Icon } from '@/components';
import { env } from '@/constants';

import { NftCard } from './nft-card';

export const NftMinted: React.FC = () => {
  const navigate = useNavigate();

  const handleButtonClick = (): void => {
    window.open(env.twitter.url, '_blank'); //TODO replace with twitter share
    navigate('/home');
  };

  return (
    <NftCard
      title="Mint Successful"
      isLoading={false}
      leftIcon={
        <Icon
          name="check-circle"
          css={{ color: '$green11', fontSize: '$xl', mr: '$2' }}
        />
      }
      message="You have successfully minted your NFA."
      buttonText="Tweet about your NFA!"
      onClick={handleButtonClick}
      leftIconButton={<Icon name="twitter" />}
    />
  );
};
