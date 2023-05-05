import { useQuery } from '@apollo/client';
import { ethers } from 'ethers';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAccount } from 'wagmi';

import {
  Button,
  CardTag,
  Flex,
  Form,
  NFAIcon,
  RowData,
  Spinner,
  Stepper,
  Text,
} from '@/components';
import { getNFADocument } from '@/graphclient';
import { useAppDispatch } from '@/store';
import { bunnyCDNActions, useBunnyCDNStore } from '@/store/features/bunny-cdn';
import { AppLog } from '@/utils';
import { parseNumberToHexColor } from '@/utils/color';

import { CreateAccessPoint } from '../create-ap.context';
import { useAccessPointFormContext } from './create-ap.form.context';

export const SelectedNFA: React.FC = () => {
  const { nfa } = CreateAccessPoint.useContext();

  return (
    <RowData
      leftIcon={
        <NFAIcon
          image={nfa.logo}
          color={`#${parseNumberToHexColor(nfa.color)}57`}
        />
      }
      label={nfa.name}
      rightComponent={<CardTag css={{ minWidth: '$28' }}>Selected NFA</CardTag>}
    />
  );
};

export const CreateAccessPointFormBody: React.FC = () => {
  const { id } = useParams();
  const { address } = useAccount();
  const { nextStep } = Stepper.useContext();
  const { nfa, setNfa, billing } = CreateAccessPoint.useContext();
  const { setArgs } = CreateAccessPoint.useTransactionContext();
  const { state } = useBunnyCDNStore();
  const dispatch = useAppDispatch();

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

  const { loading: nfaLoading } = useQuery(getNFADocument, {
    skip: id === undefined,
    variables: {
      id: ethers.utils.hexlify(Number(id)),
    },
    onCompleted(data) {
      if (data.token && id) {
        const { name, tokenId, logo, color, externalURL: domain } = data.token;
        setNfa({ name, tokenId, logo, color, domain });
      } else {
        AppLog.errorToast("We couldn't find the NFA you are looking for");
      }
    },
    onError(error) {
      AppLog.errorToast('Error fetching NFA', error);
    },
  });

  useEffect(() => {
    if (state === 'success') {
      nextStep();
      dispatch(bunnyCDNActions.setState(undefined));
    }
  }, [state, nextStep, dispatch]);

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
    if (!address) {
      AppLog.errorToast('No address found. Please connect your wallet.');
      return;
    }

    if (nfa && domain) {
      try {
        setArgs([Number(nfa.tokenId), domain, { value: billing }]);
        dispatch(
          bunnyCDNActions.createBunnyCDN({
            domain: 'domain',
            targetDomain: domain,
          })
        );
      } catch (e) {
        AppLog.errorToast('Error setting transaction arguments');
      }
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
        disabled={!isValid || nfa.tokenId === ''}
        isLoading={state === 'loading'}
        colorScheme="blue"
        variant="solid"
        onClick={handleContinueClick}
      >
        Continue
      </Button>
    </Flex>
  );
};
