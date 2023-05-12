import {
  Card,
  CustomCardContainer,
  CustomCardHeader,
  Flex,
  Stepper,
} from '@/components';

import { GithubButton } from './github-button';

export const GithubConnect: React.FC = () => {
  const { prevStep } = Stepper.useContext();

  return (
    <CustomCardContainer>
      <CustomCardHeader.Default title="Connect GitHub" onClickBack={prevStep} />
      <Card.Body>
        <Flex css={{ gap: '$6', flexDirection: 'column' }}>
          <GithubButton />
          <Card.Text
            css={{
              height: '$46h',
              maxWidth: '$95',
              fontSize: '$md',
              px: '$12',
            }}
          >
            <span>
              After connecting your GitHub, your repositories will show here.
            </span>
          </Card.Text>
        </Flex>
      </Card.Body>
    </CustomCardContainer>
  );
};
