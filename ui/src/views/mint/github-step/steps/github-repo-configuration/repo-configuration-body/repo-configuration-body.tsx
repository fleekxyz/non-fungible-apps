import { Button, Card, CardTag, Flex, Stepper } from '@/components';
import { Mint } from '@/views/mint/mint.context';
import { useMintFormContext } from '@/views/mint/nfa-step/form-step';

import { RepoRow } from '../../repository-row';
import { RepoBranchCommitFields } from './repo-branch-commit-fields';

export const RepoConfigurationBody: React.FC = () => {
  const {
    form: {
      isValid: [isValid],
    },
  } = useMintFormContext();

  const { repositoryName } = Mint.useContext();

  const { nextStep } = Stepper.useContext();

  const handleContinueClick = (): void => {
    nextStep();
  };

  return (
    <Card.Body css={{ pt: '$2' }}>
      <Flex css={{ rowGap: '$6', flexDirection: 'column' }}>
        <RepoRow
          repo={repositoryName.name}
          css={{ mb: '0', cursor: 'default' }}
          button={<CardTag>Use for NFA</CardTag>}
        />
        <RepoBranchCommitFields />
        <Button
          disabled={!isValid}
          colorScheme="blue"
          variant="solid"
          onClick={handleContinueClick}
        >
          Continue
        </Button>
      </Flex>
    </Card.Body>
  );
};
