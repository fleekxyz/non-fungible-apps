import { Button, Flex } from '@/components';
import { Separator } from '@/components/core/separator.styles';
import { EthereumHooks } from '@/integrations';
import { AppLog } from '@/utils';
import { ConnectKitButton } from 'connectkit';
import { useAccount } from 'wagmi';

/**
 * This is an example about how to use the EthereumHooks to create a context for a contract method
 *
 * TODO: this view must be removed before releasing the app
 */

// We first create a context for a selected contract method
const [MintProvider, useMintContext] =
  EthereumHooks.createFleekERC721WriteContext('mint');

const Preparing: React.FC = () => {
  // We can check the states of the stage of the contract using the context
  const {
    prepare: { status: prepareStatus, data: prepareData, error: prepareError },
    setArgs,
  } = useMintContext();

  const handlePrepare = () => {
    // `setArgs` will fulfill the arguments used to call the contract method
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

  // We can change the UI rendering based on the states
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
    // In the write key we will have the trigger to call the contract method
    write: {
      status: mintStatus,
      write: mint,
      data: mintData,
      error: mintError,
    },
  } = useMintContext();

  const handleMint = () => {
    // The trigger function will be undefined in case the contract method is not ready to be called
    // Preparing the contract method will run a gas estimation and will set the trigger function
    // If the gas estimation fails, the trigger function will be undefined
    // This may happen for invalid arguments, if the user has no permissions to call the method, etc.
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
    // The provider must wrap the UI that will use the context
    <MintProvider
      config={{
        // We can setup callbacks for every stage of the process in this config
        prepare: {
          onSuccess: (data) => {
            AppLog.info('Prepared', data);
          },
        },

        write: {
          onSuccess: (data) => {
            AppLog.info('Mint sent', data);
          },
        },

        transaction: {
          onSuccess: (data) => {
            AppLog.info('Transaction success', data);
          },
        },
      }}
    >
      {isConnected ? <Container /> : <ConnectKitButton />}
    </MintProvider>
  );
};
