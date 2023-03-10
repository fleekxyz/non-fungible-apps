import { Icon } from '@/components';
import { useNavigate } from 'react-router-dom';
import { NftCard } from './nft-card';

export const NftMinted = () => {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    window.open('https://twitter.com/share?ref_src=twsrc%5Etfw', '_blank'); //TODO replace with twitter share
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
