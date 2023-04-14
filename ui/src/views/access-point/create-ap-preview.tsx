import { ethers } from 'ethers';
import { useEffect, useMemo } from 'react';

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
import { AppLog } from '@/utils';

export const AccessPointDataFragment: React.FC = () => {
  const { address } = useAccount();
  const { data: ensName, isLoading: isLoadingEns } = useEnsName({ address });

  const {
    form: {
      domain: {
        value: [domain],
      },
    },
  } = useAccessPointFormContext();

  if (isLoadingEns) return <div>Loading...</div>; //TODO replace with spinner

  return (
    <>
      <SelectedNFA />
      <DisplayText label="Owner" value={ensName || address || ''} />
      <DisplayText label="Frontend URL" value={domain} />
    </>
  );
};

export const CreateAccessPointPreview: React.FC = () => {
  const { prevStep } = Stepper.useContext();

  const {
    prepare: { status: prepareStatus, data: prepareData, error: prepareError },
    write: { status: writeStatus, write },
    transaction: { status: transactionStatus },
  } = CreateAccessPoint.useTransactionContext();

  const {
    form: {
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

  const error = useMemo(
    () => [writeStatus, transactionStatus].some((status) => status === 'error'),
    [writeStatus, transactionStatus]
  );

  useEffect(() => {
    if (error) {
      AppLog.errorToast('An error occurred while minting the NFA');
    }
  }, [error]);

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
          <AccessPointDataFragment />
          <Text>{message}</Text>
          <Button
            isLoading={isLoading}
            isDisabled={isLoading || !isValid}
            colorScheme="blue"
            variant="solid"
            onClick={write}
          >
            Create
          </Button>
        </Flex>
      </Card.Body>
    </Card.Container>
  );
};
