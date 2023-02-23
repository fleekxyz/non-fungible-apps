import { Icon, IconButton, Stepper } from '@/components';
import { useTransactionCost } from '@/hooks';
import { Mint } from '@/views/mint/mint.context';
import { ethers } from 'ethers';
import { useMemo } from 'react';
import { NftCard } from '../nft-card';

export const MintPreview = () => {
  const { prevStep } = Stepper.useContext();
  const {
    prepare: { status: prepareStatus, data: prepareData },
    write: { status: writeStatus, write },
    transaction: { status: transactionStatus },
  } = Mint.useTransactionContext();

  const [cost, currency, isCostLoading] = useTransactionCost(
    prepareData?.request.value,
    prepareData?.request.gasLimit
  );

  //TODO handle error when minting

  const message = useMemo(() => {
    if (isCostLoading || prepareStatus === 'loading')
      return 'Calculating cost...';

    const formattedCost = ethers.utils.formatEther(cost).slice(0, 9);
    return `Minting this NFA will cost ${formattedCost} ${currency}.`;
  }, [prepareData, isCostLoading, prepareStatus]);

  const isLoading = useMemo(
    () =>
      [prepareStatus, writeStatus, transactionStatus].some(
        (status) => status === 'loading'
      ),
    [prepareStatus, writeStatus, transactionStatus]
  );

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
      message={message}
      buttonText="Mint NFA"
      onClick={write!}
      isLoading={isLoading}
    />
  );
};
