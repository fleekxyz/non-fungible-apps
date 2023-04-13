import { ethers } from 'ethers';
import { useMemo } from 'react';

import {
  Button,
  Card,
  DisplayText,
  Flex,
  Icon,
  IconButton,
  Stepper,
  Text,
} from '@/components';
import { useTransactionCost } from '@/hooks';
import { FleekERC721 } from '@/integrations';

import { CreateAccessPoint } from './create-ap.context';
import { useAccessPointFormContext } from './ap-form-step/create-ap.form.context';
import { SelectedNFA } from './ap-form-step/create-ap.form-body';
import { useAccount, useEnsName } from 'wagmi';

export const CreateAccessPointPreview: React.FC = () => {
  const { prevStep } = Stepper.useContext();
  const { address } = useAccount();
  const {
    data: ensName,
    isError,
    isLoading: isLoadingEns,
  } = useEnsName({ address });

  const {
    prepare: { status: prepareStatus, data: prepareData, error: prepareError },
    write: { status: writeStatus, write },
    transaction: { status: transactionStatus },
  } = CreateAccessPoint.useTransactionContext();
  const {
    form: {
      domain: {
        value: [domain],
      },
      isValid: [isValid],
    },
  } = useAccessPointFormContext();

  const [cost, currency, isCostLoading] = useTransactionCost(
    prepareData?.request.value,
    prepareData?.request.gasLimit
  );

  const message = useMemo(() => {
    if (isCostLoading || prepareStatus === 'loading')
      return 'Calculating cost...';

    if (prepareError) {
      const parsedError = FleekERC721.parseError(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (prepareError as any).error?.data.data
      );
      if (parsedError.isIdentified) {
        return parsedError.message;
      }

      return 'An error occurred while preparing the transaction';
    }

    const formattedCost = ethers.utils.formatEther(cost).slice(0, 9);
    return `Creating this Access Point will cost ${formattedCost} ${currency}.`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prepareData, isCostLoading, prepareStatus]);

  const isLoading = useMemo(
    () =>
      [prepareStatus, writeStatus, transactionStatus].some(
        (status) => status === 'loading'
      ),
    [prepareStatus, writeStatus, transactionStatus]
  );

  if (isLoadingEns) return <div>Loading...</div>; //TODO replace with spinner

  return (
    <Card.Container css={{ width: '$107h' }}>
      <Card.Heading
        title="Review Details"
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
        <Flex css={{ flexDirection: 'column', gap: '$6' }}>
          <SelectedNFA />
          <DisplayText label="Owner" value={ensName || address || ''} />
          <DisplayText label="Frontend URL" value={domain} />
          <Text>{message}</Text>
          <Button
            isLoading={isLoading}
            isDisabled={isLoading || !isValid}
            colorScheme="blue"
            variant="solid"
            onClick={write}
          >
            Continue
          </Button>
        </Flex>
      </Card.Body>
    </Card.Container>
  );
};
