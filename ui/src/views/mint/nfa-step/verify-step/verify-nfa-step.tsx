import { useState } from 'react';

import {
  Button,
  Card,
  Dropdown,
  DropdownItem,
  Flex,
  Stepper,
  Switch,
  Text,
} from '@/components';

import { Mint } from '../../mint.context';
import { MintCardHeader } from '../../mint-card';
import { useMintFormContext } from '../form-step';

const DropdownValuesMock = [
  {
    label: 'Fleek',
    value: 'fleek',
  },
];

const SelectVerifier: React.FC = () => {
  const {
    form: {
      verifier: {
        value: [, setValue],
      },
    },
  } = useMintFormContext();

  const [selectedItem, setSelectedItem] = useState<DropdownItem>();

  const onChange = (selected: DropdownItem): void => {
    setSelectedItem(selected);
    setValue(selected.value);
  };

  return (
    <Dropdown
      items={DropdownValuesMock}
      onChange={onChange}
      selectedValue={selectedItem}
    />
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
    <Card.Container css={{ width: '$107h' }}>
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
