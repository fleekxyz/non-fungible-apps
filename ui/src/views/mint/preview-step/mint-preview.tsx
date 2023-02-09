import { Button, Card, Grid, Icon, IconButton, Stepper } from '@/components';
import { SVGPreview } from './svg-preview';

export const MintPreview = () => {
  const { prevStep } = Stepper.useContext();
  return (
    <Card.Container css={{ p: '$0' }}>
      <SVGPreview />

      <Card.Body css={{ p: '$7' }}>
        <Grid css={{ rowGap: '$6' }}>
          <Card.Heading
            title="Mint NFA"
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
          {/* TODO replace for real price when integrate with wallet */}
          <span>Minting this NFA will cost 0.0008 MATIC.</span>
          {/* TODO add desabled when user doesnt have enough MATIC */}
          {/* TODO repalce for app name when connect with context */}
          <Button colorScheme="blue" variant="solid">
            Mint NFA
          </Button>
        </Grid>
      </Card.Body>
    </Card.Container>
  );
};
