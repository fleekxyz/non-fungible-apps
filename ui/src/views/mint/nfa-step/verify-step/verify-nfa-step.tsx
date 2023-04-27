import { useQuery } from '@apollo/client';
import { useEffect, useMemo } from 'react';

import { getVerifiersDocument } from '@/../.graphclient';
import {
  Button,
  Card,
  Flex,
  Form,
  ResolvedAddress,
  Stepper,
  Switch,
  Text,
} from '@/components';
import { useENSStore } from '@/store';

import { Mint } from '../../mint.context';
import { MintCardHeader } from '../../mint-card';
import { useMintFormContext } from '../form-step';

// TODO: remove mocked items after graphql api is fixed
const mockedItems = [
  '0xdBb04e00D5ec8C9e3aeF811D315Ee7C147c5DBFD',
  '0x7ED735b7095C05d78dF169F991f2b7f1A1F1A049',
];

const SelectVerifier: React.FC = () => {
  const {
    form: { verifier },
  } = useMintFormContext();

  const {
    value: [selectedVerifier, setSelectedVerifier],
  } = verifier;

  const { addressMap } = useENSStore();

  const { data } = useQuery(getVerifiersDocument);

  const items = useMemo(() => {
    if (!data) return [];

    const verifiers = data.verifiers
      .map<string>((verifier) => verifier.id.toString())
      .concat(mockedItems);

    return verifiers.map((verifier) => ({
      address: verifier,
      ens: addressMap[verifier]?.value,
    }));
  }, [data, addressMap]);

  useEffect(() => {
    if (!selectedVerifier && items.length > 0) {
      setSelectedVerifier(items[0].address);
    }
  }, [selectedVerifier, setSelectedVerifier, items]);

  return (
    <Form.Field context={verifier}>
      <Form.Combobox
        items={items}
        handleValue={(item) => item.address}
        queryKey={['address', 'ens']}
      >
        {({ Field, Options }) => (
          <>
            <Field>
              {(selected) =>
                selected ? (
                  <ResolvedAddress>{selected.address}</ResolvedAddress>
                ) : (
                  'Select a Verifier'
                )
              }
            </Field>
            <Options>
              {(item) => <ResolvedAddress>{item.address}</ResolvedAddress>}
            </Options>
          </>
        )}
      </Form.Combobox>
    </Form.Field>
  );
};

export const VerifyNFAStep: React.FC = () => {
  const { prevStep } = Stepper.useContext();
  const { verifyNFA, setVerifyNFA, setNfaStep } = Mint.useContext();
  const {
    form: {
      verifier: {
        value: [verifier],
      },
    },
  } = useMintFormContext();

  const handleNextStep = (): void => {
    setNfaStep(2);
  };

  return (
    <Card.Container css={{ maxWidth: '$107h' }}>
      <MintCardHeader title="Verify NFA" onClickBack={prevStep} />
      <Card.Body>
        <Flex css={{ flexDirection: 'column', gap: '$6' }}>
          <Text css={{ color: '$slate11', fontSize: '$sm' }}>
            Below you can allow Fleek to be added as a controller to your NFA.
            This will allow Fleek to automatically verify your NFA and update
            builds and other metadata. It will not allow Fleek to transfer or
            burn your NFT. You can change this setting later on your NFA but
            adding it now will save you a transaction in the future. We
            recommend it so that your users can get verified NFAs.
          </Text>
          <Card.Text
            css={{
              p: '$4',
              textAlign: 'left',
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderRadius: '$lg',
            }}
          >
            <Text css={{ color: '$slate12' }}>Verify NFA</Text>
            <Switch checked={verifyNFA} onChange={setVerifyNFA} />
          </Card.Text>
          <SelectVerifier />
          <Button
            colorScheme="blue"
            variant="solid"
            onClick={handleNextStep}
            disabled={!verifier}
          >
            Continue
          </Button>
        </Flex>
      </Card.Body>
    </Card.Container>
  );
};
