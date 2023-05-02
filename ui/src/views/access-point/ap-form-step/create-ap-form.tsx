import {
  Card,
  CustomCardContainer,
  CustomCardHeader,
  Flex,
  Stepper,
} from '@/components';

import { CreateAccessPointFormBody } from './create-ap-form-body';

export const CreateAccessPointForm: React.FC = () => {
  const { prevStep } = Stepper.useContext();

  return (
    <CustomCardContainer>
      <CustomCardHeader.Default title="Enter Domain" onClickBack={prevStep} />
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
    </CustomCardContainer>
  );
};
