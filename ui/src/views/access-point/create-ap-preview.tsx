import {
  Button,
  Card,
  Form,
  Grid,
  Icon,
  IconButton,
  Stepper,
} from '@/components';
import { AP } from './create-ap.context';
import { useTransactionCost } from '@/hooks';
import { FleekERC721 } from '@/integrations';
import { useMemo } from 'react';
import { ethers } from 'ethers';

export const CreateAPPreview = () => {
  const { prevStep } = Stepper.useContext();
  const {
    prepare: { status: prepareStatus, data: prepareData, error: prepareError },
    write: { status: writeStatus, write },
    transaction: { status: transactionStatus },
  } = AP.useTransactionContext();
  const { appName, token } = AP.useContext();

  const [cost, currency, isCostLoading] = useTransactionCost(
    prepareData?.request.value,
    prepareData?.request.gasLimit
  );

  //TODO handle error when minting

  const message = useMemo(() => {
    if (isCostLoading || prepareStatus === 'loading')
      return 'Calculating cost...';

    // TODO: better UI for prepare errors
    if (prepareError) {
      const parsedError = FleekERC721.parseError(
        (prepareError as any).error?.data.data
      );
      if (parsedError.isIdentified) {
        return parsedError.message;
      }

      return 'An error occurred while preparing the transaction';
    }

    const formattedCost = ethers.utils.formatEther(cost).slice(0, 9);
    return `Creating this Access Point will cost ${formattedCost} ${currency}.`;
  }, [prepareData, isCostLoading, prepareStatus]);

  const isLoading = useMemo(
    () =>
      [prepareStatus, writeStatus, transactionStatus].some(
        (status) => status === 'loading'
      ),
    [prepareStatus, writeStatus, transactionStatus]
  );

  return (
    <Card.Container css={{ width: '$107h' }}>
      <Card.Heading
        title={`Create Access Point token ${token.label}`}
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
      />
      <Card.Body>
        <Grid
          css={{
            rowGap: '$6',
          }}
        >
          <Form.Field>
            <Form.Label>Token: {token.value}</Form.Label>
          </Form.Field>
          <Form.Field>
            <Form.Label>{appName}</Form.Label>
          </Form.Field>
          <Form.Field>
            <Form.Label>{message}</Form.Label>
          </Form.Field>
          <Button
            disabled={!appName || !token}
            colorScheme="blue"
            variant="solid"
            onClick={write}
            isLoading={isLoading}
          >
            Create
          </Button>
        </Grid>
      </Card.Body>
    </Card.Container>
  );
};
