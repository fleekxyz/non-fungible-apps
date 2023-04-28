import { Card, Flex, Stepper } from '@/components';
import { MintCardContainer, MintCardHeader } from '@/views/mint/mint-card';

import { CreateAccessPointFormBody } from './create-ap-form-body';

export const CreateAccessPointForm: React.FC = () => {
  const { prevStep } = Stepper.useContext();

  return (
    <MintCardContainer>
      <MintCardHeader title="Enter Domain" onClickBack={prevStep} />
      <Card.Body>
        <Flex
          css={{
            flexDirection: 'column',
            gap: '$6',
          }}
        >
          <CreateAccessPointFormBody />
        </Flex>
      </Card.Body>
    </MintCardContainer>
  );
};
