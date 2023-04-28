import { Card, Grid, Stepper } from '@/components';
import { MintCardContainer, MintCardHeader } from '@/views/mint/mint-card';

import { GithubButton } from './github-button';

export const GithubConnect: React.FC = () => {
  const { prevStep } = Stepper.useContext();

  return (
    <MintCardContainer>
      <MintCardHeader title="Connect GitHub" onClickBack={prevStep} />
      <Card.Body>
        <Grid css={{ rowGap: '$6' }}>
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
        </Grid>
      </Card.Body>
    </MintCardContainer>
  );
};
