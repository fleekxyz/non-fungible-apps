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

export const SelectedNFA: React.FC = () => {
  const { nfa } = CreateAccessPoint.useContext();
  if (!nfa.logo) return null;
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
  const { nextStep, setStep } = Stepper.useContext();
  const { nfa, setNfa } = CreateAccessPoint.useContext();
  const { setArgs } = CreateAccessPoint.useTransactionContext();
  const { state } = useBunnyCDNStore();
  const dispatch = useAppDispatch();

  const {
    form: {
      domain: domainContext,
      isValid: [isValid],
    },
  } = CreateAccessPoint.useFormContext();

  const {
    value: [domain],
  } = domainContext;

  const { loading: nfaLoading } = useQuery(getNFADocument, {
    skip: id === undefined,
    variables: {
      id: ethers.utils.hexlify(Number(id)),
    },
    onCompleted(data) {
      if (data.token && id) {
        const { name, tokenId, logo, color, externalURL } = data.token;
        setNfa({ name, tokenId, logo, color, externalURL });
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
    if (!address)
      return AppLog.errorToast('No address found. Please connect your wallet.');

    if (!nfa) return AppLog.errorToast('The selected NFA is invalid');

    setArgs([address, nfa.tokenId]);
    try {
      if (domain) {
        dispatch(
          bunnyCDNActions.createBunnyCDN({
            domain: 'domain',
            targetDomain: domain,
          })
        );
      } else {
        setStep(4);
      }
    } catch (e) {
      AppLog.errorToast('Error setting transaction arguments', e);
    }
  };

  return (
    <Flex css={{ flexDirection: 'column', gap: '$6' }}>
      <SelectedNFA />
      <Text css={{ fontSize: '$sm', color: '$slate11' }}>
        You may add a custom domain for your app. If you do not, you will be
        able to access it through any public IPFS gateway.
      </Text>
      <Form.Field context={domainContext}>
        <Form.Label>Custom Domain</Form.Label>
        <Form.Input placeholder="mydomain.com" />
        <Form.Overline />
      </Form.Field>
      <Button
        disabled={!isValid} // TODO: Add nfa.tokenId validation
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
