import { Button, Flex } from '@/components';
import { Separator } from '@/components/core/separator.styles';
import { useFleekERC721 } from '@/integrations';
import { ConnectKitButton } from 'connectkit';
import { useAccount } from 'wagmi';

export const MintTest: React.FC = () => {
  const { address, isConnected } = useAccount();

  const {
    prepare: { status: prepareStatus, data: prepareData, error: prepareError },
    write: {
      status: mintStatus,
      write: mint,
      data: mintData,
      error: mintError,
    },
    transaction: {
      status: transactionStatus,
      data: transactionData,
      error: transactionError,
    },
  } = useFleekERC721(
    'mint',
    [
      address as string,
      'App NFT',
      'App NFT Description',
      'https://appnft.com',
      'appnft.eth',
      '5843ce0ce03607180d9f0b58d4df048bf8a202c7',
      'https://github.com/fleekxyz/non-fungible-apps',
      'test-logo',
      0x123456,
      true,
    ],
    {
      transaction: {
        onSuccess: (data) => {
          console.log('Transaction success', data);
        },
      },
    }
  );

  if (!isConnected) {
    return <ConnectKitButton />;
  }

  if (prepareStatus !== 'success') {
    if (prepareStatus === 'error') {
      console.error(prepareError);
      return <div>Prepare error</div>;
    }
    if (prepareStatus === 'loading') return <div>Preparing transaction...</div>;
  }

  if (mintStatus !== 'success') {
    if (mintStatus === 'error') {
      console.error(mintError);
    }

    const isLoading = mintStatus === 'loading';
    return (
      <Button isLoading={isLoading} disabled={isLoading} onClick={mint}>
        Mint!
      </Button>
    );
  }

  if (transactionStatus !== 'success') {
    if (transactionStatus === 'error') {
      console.error(transactionError);
      return <div>Transaction error</div>;
    }
    if (transactionStatus === 'loading')
      return <div>Waiting for transaction to finish...</div>;
  }

  return (
    <Flex css={{ flexDirection: 'column', gap: '$1' }}>
      <h2>Prepare Data:</h2>
      <pre>{JSON.stringify(prepareData, null, 2)}</pre>
      <Separator />
      <h2>Mint Data:</h2>
      <pre>{JSON.stringify(mintData, null, 2)}</pre>
      <Separator />
      <h2>Transaction Data:</h2>
      <pre>{JSON.stringify(transactionData, null, 2)}</pre>
    </Flex>
  );
};
