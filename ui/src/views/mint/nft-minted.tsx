import { Icon } from '@/components';
import { Mint } from './mint.context';
import { NftCard } from './nft-card';

export const NftMinted = () => {
  const { setSucessMint } = Mint.useContext();

  return (
    <NftCard
      title="Mint Successful"
      leftIcon={
        <Icon
          name="check-circle"
          css={{ color: '$green11', fontSize: '$xl', mr: '$2' }}
        />
      }
      message="You have successfully minted your NFA."
      buttonText="Tweet about your NFA!"
      onClick={() => {
        alert('TODO: Tweet about your NFA!');
      }}
      leftIconButton={<Icon name="twitter" />}
    />
  );
};
