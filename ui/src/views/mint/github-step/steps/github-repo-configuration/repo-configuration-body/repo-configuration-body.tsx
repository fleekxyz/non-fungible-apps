import { Button, Card, Flex, Form, Stepper } from '@/components';
import { useGithubStore } from '@/store';
import { Mint } from '@/views/mint/mint.context';
import { useMintFormContext } from '@/views/mint/nfa-step/form-step';
import { RepoRow } from '../../repository-row';
import { RepoBranchCommitFields } from './repo-branch-commit-fields';

export const RepoConfigurationBody = () => {
  const { branches } = useGithubStore();
  const {
    form: {
      isValid: [isValid, setIsValid],
      gitCommit: {
        value: [gitCommit],
      },
      gitBranch: {
        value: [gitBranch],
      },
    },
  } = useMintFormContext();
  const { repositoryName, setBranchName } = Mint.useContext();

  const { nextStep } = Stepper.useContext();

  console.log('gitCommit', gitCommit);
  console.log('gitBranch', gitBranch);

  const handleContinueClick = () => {
    const branchLabel = branches.find((branch) => branch.value === gitBranch); //TOOD find way to save the combobox item on context
    setBranchName({ value: gitBranch, label: branchLabel?.label || '' });
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
        <Form.Root onValidationChange={setIsValid}>
          <RepoBranchCommitFields />
          <Button
            disabled={!isValid}
            colorScheme="blue"
            variant="solid"
            onClick={handleContinueClick}
          >
            Continue
          </Button>
        </Form.Root>
      </Flex>
    </Card.Body>
  );
};
