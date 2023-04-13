import { useQuery } from '@apollo/client';
import { ethers } from 'ethers';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import {
  Button,
  CardTag,
  Flex,
  Form,
  NFAIcon,
  Spinner,
  Stepper,
  Text,
} from '@/components';
import { getNFADocument } from '@/graphclient';
import { AppLog } from '@/utils';

import { CreateAccessPoint } from '../create-ap.context';
import { useAccessPointFormContext } from './create-ap.form.context';

export const SelectedNFA: React.FC = () => {
  const { nfa } = CreateAccessPoint.useContext();

  return (
    <Flex
      css={{
        justifyContent: 'space-between',
      }}
    >
      <Flex css={{ alignItems: 'center' }}>
        <NFAIcon image={nfa.logo} color={nfa.color} />
        <span>{nfa.name}</span>
      </Flex>
      <CardTag>Selected NFA</CardTag>
    </Flex>
  );
};

export const CreateAccessPointFormBody: React.FC = () => {
  const { id } = useParams();
  const { nextStep } = Stepper.useContext();
  const { nfa, setNfa, billing } = CreateAccessPoint.useContext();
  const { setArgs } = CreateAccessPoint.useTransactionContext();

  const {
    form: {
      domain: {
        value: [domain],
      },
      isValid: [isValid],
    },
  } = useAccessPointFormContext();

  const {
    form: { domain: domainContext },
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
        const { name, tokenId, logo, color } = nfaData.token;
        setNfa({ name, tokenId, logo, color });
      } else {
        AppLog.errorToast("We couldn't find the NFA you are looking for");
      }
    }
  }, [nfaData, id, setNfa]);

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

  const handleContinueClick = (): void => {
    if (nfa && domain) {
      //TODO add try-catch
      setArgs([Number(nfa.tokenId), domain, { value: billing }]);
      nextStep();
    }
  };

  return (
    <Flex css={{ flexDirection: 'column', gap: '$6' }}>
      <SelectedNFA />
      <Text css={{ fontSize: '$sm', color: '$slate11' }}>
        Enter the domain you want to host the NFA. You will need access to the
        DNS settings in the next step.
      </Text>
      <Form.Field context={domainContext}>
        <Form.Label>Domain</Form.Label>
        <Form.Input placeholder="mydomain.com" />
        <Form.Overline />
      </Form.Field>
      <Button
        disabled={!isValid}
        colorScheme="blue"
        variant="solid"
        onClick={handleContinueClick}
      >
        Continue
      </Button>
    </Flex>
  );
};
