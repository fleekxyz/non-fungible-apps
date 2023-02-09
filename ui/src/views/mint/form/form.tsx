import {
  Button,
  Card,
  Dropdown,
  DropdownItem,
  Flex,
  Form,
  Grid,
  Icon,
  IconButton,
  Stepper,
} from '@/components';
import React, { useState } from 'react';
import { ColorPicker } from './color-picker';
import {
  fileToBase64,
  parseColorToNumber,
  validateFileSize,
} from './form.utils';

// TODO remove after integration with wallet
const ensList: DropdownItem[] = [
  {
    value: 'fleek.eth',
    label: 'fleek.eth',
  },
  {
    value: 'ens.eth',
    label: 'ens.eth',
  },
  {
    value: 'cami.eth',
    label: 'cami.eth',
  },
];

export const FormCard = () => {
  const { prevStep, nextStep } = Stepper.useContext();
  const [appName, setAppName] = useState('');
  const [appDescription, setAppDescription] = useState('');
  const [file, setFile] = useState<string>(''); // The logo needs to be a base64 of a SVG capped at 10kb
  const [color, setColor] = useState(''); // The color used in preview is a hex string (e.g. #ffffff) but it requires to be a number when sending to the contract
  const [selectedEns, setSelectedEns] = useState<DropdownItem>();
  const [verifyNFA, setVerifyNFA] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleEnsChange = (item: DropdownItem) => {
    setSelectedEns(item);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      if (validateFileSize(file)) {
        const fileBase64 = await fileToBase64(file);
        setFile(fileBase64);
        setErrorMessage(null);
        //TODO remove console.log
        // To send to the contract the logo needs to be a base64 string
        console.log('Sending to contract:', fileBase64);
      } else {
        setFile('');
        setColor('');
        setErrorMessage('File size is too big');
      }
    }
  };

  const handleAppNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAppName(e.target.value);
  };

  const handleAppDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setAppDescription(e.target.value);
  };

  const handleVerifyNFAChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVerifyNFA(e.target.checked);
  };

  const handleConinue = (e: React.ChangeEvent<HTMLButtonElement>) => {
    // TODO set to context
    console.log('Sending to contract:', {
      appName,
      appDescription,
      file,
      color, // parseColorToNumber(color),
      selectedEns,
      verifyNFA,
    });
    nextStep();
  };

  return (
    <Card.Container css={{ width: '424px' }}>
      <Card.Heading
        title="NFA Details"
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
        <Grid css={{ rowGap: '$6' }}>
          <Grid css={{ rowGap: '$4' }}>
            <Form.Field>
              <Form.Label>Name</Form.Label>
              <Form.Input
                placeholder="Your app name"
                value={appName}
                onChange={handleAppNameChange}
              />
            </Form.Field>
            <Form.Field>
              <Form.Label>Description</Form.Label>
              <Form.Textarea
                placeholder="Add information about your project here."
                css={{ height: 'auto' }}
                value={appDescription}
                onChange={handleAppDescriptionChange}
              />
            </Form.Field>
            <Flex
              css={{ width: '$full', gap: '$4h', alignItems: 'flex-start' }}
            >
              <Form.Field>
                <Form.Label>Logo</Form.Label>
                <Form.LogoFileInput value={file} onChange={handleFileChange} />
                {errorMessage && <Form.Error>{errorMessage}</Form.Error>}
              </Form.Field>
              <ColorPicker file={file} color={color} setColor={setColor} />
            </Flex>
            <Flex css={{ columnGap: '$4' }}>
              <Form.Field css={{ flex: 1 }}>
                <Form.Label>ENS</Form.Label>
                <Dropdown
                  items={ensList}
                  selectedValue={selectedEns}
                  onChange={handleEnsChange}
                />
              </Form.Field>
              <Form.Field css={{ flex: 1 }}>
                <Form.Label>Domain</Form.Label>
                <Form.Input placeholder="mydomain.com" />
              </Form.Field>
            </Flex>
            <Card.Text css={{ p: '$4', textAlign: 'left' }}>
              {/* TODO replace for grid */}
              <Flex css={{ gap: '$10' }}>
                <Grid css={{ rowGap: '$1h' }}>
                  <span>Verify NFA</span>
                  <span>
                    Add Fleek as a controller to be verified, learn more here.
                  </span>
                </Grid>
                <input
                  type="checkbox"
                  checked={verifyNFA}
                  onChange={handleVerifyNFAChange}
                />
              </Flex>
            </Card.Text>
          </Grid>
          <Button
            disabled={!appName || !appDescription}
            colorScheme="blue"
            variant="solid"
            onClick={handleConinue}
          >
            Continue
          </Button>
        </Grid>
      </Card.Body>
    </Card.Container>
  );
};
