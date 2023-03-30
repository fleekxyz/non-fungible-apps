import { Button, Flex, Form, Spinner, Stepper } from '@/components';
import { AppLog } from '@/utils';
import { useQuery } from '@apollo/client';
import { ethers } from 'ethers';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAccessPointFormContext } from './create-ap.form.context';
import { NfaPicker } from './nfa-picker';
import { getNFADocument } from '@/graphclient';
import { CreateAccessPoint } from './create-ap.context';

export const CreateAccessPointFormBody = () => {
  const { id } = useParams();
  const { setNfa } = CreateAccessPoint.useContext();

  const { nextStep } = Stepper.useContext();

  const { nfa, billing } = CreateAccessPoint.useContext();
  const { setArgs } = CreateAccessPoint.useTransactionContext();

  const {
    form: {
      appName: {
        value: [appName],
      },
      isValid: [isValid],
    },
  } = useAccessPointFormContext();

  const {
    form: { appName: appNameContext },
  } = useAccessPointFormContext();

  const {
    data: nfaData,
    error: nfaError,
    loading: nfaLoading,
  } = useQuery(getNFADocument, {
    skip: id === undefined,
    variables: {
      id: ethers.utils.hexlify(Number(id)),
    },
  });

  useEffect(() => {
    if (nfaError) {
      AppLog.errorToast('Error fetching NFA');
    }
  }, [nfaError]);

  useEffect(() => {
    if (nfaData) {
      if (nfaData.token && id) {
        const { name } = nfaData.token;
        setNfa({ value: id, label: name });
      } else {
        AppLog.errorToast("We couldn't find the NFA you are looking for");
      }
    }
  }, [nfaData, id]);

  if (nfaLoading) {
    return (
      <Flex
        css={{
          justifyContent: 'center',
          alignItems: 'center',
          height: '$48',
        }}
      >
        <Spinner />
      </Flex>
    );
  }

  const handleContinueClick = () => {
    if (nfa && appName) {
      setArgs([Number(nfa.value), appName, { value: billing }]);
      nextStep();
    }
  };

  return (
    <>
      {/* TODO will have to do some changes on the Form.Combobox if we use this component for the NFA picker */}
      {id === undefined && <NfaPicker />}
      <Form.Field context={appNameContext}>
        <Form.Label>App Name</Form.Label>
        <Form.Input />
      </Form.Field>
      <Button
        disabled={!isValid}
        colorScheme="blue"
        variant="solid"
        onClick={handleContinueClick}
      >
        Continue
      </Button>
    </>
  );
};
