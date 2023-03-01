import { Button, Card, Flex, Stepper, Switch, Text } from '@/components';
import { MintCardHeader } from '../../mint-card';
import { Mint } from '../../mint.context';

export const VerifyNFAStep = () => {
  const { prevStep } = Stepper.useContext();
  const { verifyNFA, setVerifyNFA, setNfaStep } = Mint.useContext();

  const handleNextStep = () => {
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
          <Button colorScheme="blue" variant="solid" onClick={handleNextStep}>
            Continue
          </Button>
        </Flex>
      </Card.Body>
    </Card.Container>
  );
};
