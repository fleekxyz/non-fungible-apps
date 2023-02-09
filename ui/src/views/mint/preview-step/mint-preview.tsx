import { Icon, IconButton, Stepper } from '@/components';
import { Mint } from '@/views/mint/mint.context';
import { NftCard } from '../nft-card';

export const MintPreview = () => {
  const { prevStep } = Stepper.useContext();
  const { setSucessMint } = Mint.useContext();

  //TODO handle error when minting

  return (
    <NftCard
      title="Mint NFA"
      leftIcon={
        <IconButton
          aria-label="Add"
          colorScheme="gray"
          variant="link"
          icon={<Icon name="back" />}
          css={{ mr: '$2' }}
          onClick={prevStep}
        />
      }
      rightIcon={
        <IconButton
          aria-label="Add"
          colorScheme="gray"
          variant="link"
          icon={<Icon name="info" />}
        />
      }
      message="Minting this NFA will cost 0.0008 MATIC."
      buttonText="Mint NFA"
      onClick={() => {
        setSucessMint(true);
      }}
    />
  );
};
