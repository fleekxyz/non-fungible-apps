import {
  Button,
  Card,
  Flex,
  Form,
  Grid,
  Icon,
  IconButton,
  Stepper,
} from '@/components';
import { useTransactionCost } from '@/hooks';
import { FleekERC721 } from '@/integrations';
import { useMemo } from 'react';
import { ethers } from 'ethers';
import { CreateAccessPoint } from './create-ap.context';
import { useAccessPointFormContext } from './create-ap.form.context';

export const CreateAccessPointPreview = () => {
  const { prevStep } = Stepper.useContext();
  const {
    prepare: { status: prepareStatus, data: prepareData, error: prepareError },
    write: { status: writeStatus, write },
    transaction: { status: transactionStatus },
  } = CreateAccessPoint.useTransactionContext();
  const {
    form: {
      appName: {
        value: [appName],
      },
    },
  } = useAccessPointFormContext();
  const { nfa } = CreateAccessPoint.useContext();

  const [cost, currency, isCostLoading] = useTransactionCost(
    prepareData?.request.value,
    prepareData?.request.gasLimit
  );

  const message = useMemo(() => {
    if (isCostLoading || prepareStatus === 'loading')
      return 'Calculating cost...';

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
        title={`Create Access Point ${nfa.label || ''}`}
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
          <Flex>
            <span>NFA: {nfa.value}</span>
            <span>{appName}</span>
            <span className="text-slate11 text-sm">{message}</span>
          </Flex>
          <Button
            disabled={!!prepareError || !nfa}
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
