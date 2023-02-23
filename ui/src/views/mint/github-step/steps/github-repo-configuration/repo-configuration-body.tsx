import { Button, Card, Flex, Stepper } from '@/components';
import { Mint } from '@/views/mint/mint.context';
import { RepoRow } from '../github-repository-selection';
import { RepoBranchCommitFields } from './repo-branch-commit-fields';

export const RepoConfigurationBody = () => {
  const { repositoryName, branchName, commitHash } = Mint.useContext();

  const { nextStep } = Stepper.useContext();

  const handleContinueClick = () => {
    nextStep();
  };

  return (
    <Card.Body css={{ pt: '$2' }}>
      <Flex css={{ rowGap: '$6', flexDirection: 'column' }}>
        <RepoRow
          repo={repositoryName.name}
          css={{ mb: '0' }}
          button={
            <Button
              colorScheme="gray"
              disabled
              variant="outline"
              css={{ py: '$1', height: '$5', borderRadius: '$md' }}
            >
              Use for NFA
            </Button>
          }
        />
        <RepoBranchCommitFields />
        <Button
          disabled={!branchName.value || !commitHash}
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
