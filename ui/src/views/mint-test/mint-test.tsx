import { Button, Flex } from '@/components';
import { Separator } from '@/components/core/separator.styles';
import { EthereumHooks } from '@/integrations';
import { ConnectKitButton } from 'connectkit';
import { useAccount } from 'wagmi';

const [MintProvider, useMintContext] =
  EthereumHooks.createFleekERC721WriteContext('mint');

const Preparing: React.FC = () => {
  const {
    prepare: { status: prepareStatus, data: prepareData, error: prepareError },
    setArgs,
  } = useMintContext();

  const handlePrepare = () => {
    setArgs([
      '0x7ED735b7095C05d78dF169F991f2b7f1A1F1A049',
      'App NFT',
      'App NFT Description',
      'https://appnft.com',
      'appnft.eth',
      '5843ce0ce03607180d9f0b58d4df048bf8a202c7',
      'https://github.com/fleekxyz/non-fungible-apps',
      'test-logo',
      0x123456,
      true,
    ]);
  };

  if (prepareStatus !== 'success') {
    const isLoading = prepareStatus === 'loading';
    return (
      <>
        {prepareStatus === 'error' && (
          <Flex css={{ flexDirection: 'column', gap: '$1' }}>
            <h2>Prepare Error:</h2>
            <pre>{JSON.stringify(prepareError, null, 2)}</pre>
          </Flex>
        )}

        <Button
          onClick={handlePrepare}
          isLoading={isLoading}
          isDisabled={isLoading}
        >
          Prepare
        </Button>
      </>
    );
  }

  return (
    <Flex css={{ flexDirection: 'column', gap: '$1' }}>
      <h2>Prepare Data:</h2>
      <pre>{JSON.stringify(prepareData, null, 2)}</pre>
    </Flex>
  );
};

const Minting: React.FC = () => {
  const {
    prepare: { status: prepareStatus },
    write: {
      status: mintStatus,
      write: mint,
      data: mintData,
      error: mintError,
    },
  } = useMintContext();

  const handleMint = () => {
    if (mint) mint();
  };

  if (prepareStatus !== 'success') {
    return null;
  }

  if (mintStatus !== 'success') {
    const isLoading = mintStatus === 'loading';
    return (
      <>
        {mintStatus === 'error' && (
          <Flex css={{ flexDirection: 'column', gap: '$1' }}>
            <h2>Mint Error:</h2>
            <pre>{JSON.stringify(mintError, null, 2)}</pre>
          </Flex>
        )}

        <Button isLoading={isLoading} disabled={isLoading} onClick={handleMint}>
          Mint!
        </Button>
      </>
    );
  }

  return (
    <Flex css={{ flexDirection: 'column', gap: '$1' }}>
      <h2>Mint Data:</h2>
      <pre>{JSON.stringify(mintData, null, 2)}</pre>
    </Flex>
  );
};

const Waiting: React.FC = () => {
  const {
    write: { status: mintStatus },
    transaction: {
      status: transactionStatus,
      data: transactionData,
      error: transactionError,
    },
  } = useMintContext();

  if (mintStatus !== 'success') {
    return null;
  }

  if (transactionStatus !== 'success') {
    if (transactionStatus === 'error') {
      console.error(transactionError);
      return <div>Transaction error</div>;
    }
    if (transactionStatus === 'loading')
      return <div>Waiting for transaction...</div>;
  }

  return (
    <Flex css={{ flexDirection: 'column', gap: '$1' }}>
      <h2>Transaction Data:</h2>
      <pre>{JSON.stringify(transactionData, null, 2)}</pre>
    </Flex>
  );
};

const Container: React.FC = () => (
  <Flex
    css={{
      flexDirection: 'column',
      gap: '$2',
      p: '$2',
      '& pre': {
        maxHeight: '200px',
        overflow: 'auto',
        backgroundColor: '#66666666',
      },
    }}
  >
    <Preparing />
    <Separator />
    <Minting />
    <Separator />
    <Waiting />
  </Flex>
);

export const MintTest: React.FC = () => {
  const { isConnected } = useAccount();

  return (
    <MintProvider
      config={{
        prepare: {
          onSuccess: (data) => {
            console.log('Prepared', data);
          },
        },

        write: {
          onSuccess: (data) => {
            console.log('Mint sent', data);
          },
        },

        transaction: {
          onSuccess: (data) => {
            console.log('Transaction success', data);
          },
        },
      }}
    >
      {isConnected ? <Container /> : <ConnectKitButton />}
    </MintProvider>
  );
};
