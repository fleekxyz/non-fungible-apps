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
            {/* TODO define text */}
            Below you can allow Fleek to be added as a controller to your NFA.
            This will.... dolor sit amet, consectetur adipiscing elit. Aliquam
            cursus eget orci nec tristique. Cras iaculis orci ipsum, a
            condimentum nulla semper.
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
