import { ethers } from 'ethers';
import { useEffect, useMemo } from 'react';
import { useAccount } from 'wagmi';

import {
  Button,
  Card,
  DisplayText,
  Flex,
  Icon,
  IconButton,
  ResolvedAddress,
  Stepper,
  Text,
} from '@/components';
import { useTransactionCost } from '@/hooks';
import { FleekERC721 } from '@/integrations';
import { AppLog } from '@/utils';

import { useAccessPointFormContext } from './ap-form-step/create-ap.form.context';
import { SelectedNFA } from './ap-form-step/create-ap-form-body';
import { CreateAccessPoint } from './create-ap.context';

export const AccessPointDataFragment: React.FC = () => {
  const { address, status } = useAccount();
  const {
    form: {
      domain: {
        value: [domain],
      },
    },
  } = useAccessPointFormContext();

  if (status === 'connecting') return <div>Loading...</div>; //TODO replace with spinner

  return (
    <>
      <SelectedNFA />
      <DisplayText
        label="Owner"
        value={
          <ResolvedAddress truncated={false}>{address || ''}</ResolvedAddress>
        }
      />
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

  useEffect(() => {
    const error = [writeStatus, transactionStatus].some(
      (status) => status === 'error'
    );
    if (error) {
      AppLog.errorToast('An error occurred while minting the NFA');
    }
  }, [writeStatus, transactionStatus]);

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
